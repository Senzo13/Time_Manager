defmodule TimeManager.Accounts do

  alias Argon2
  import Ecto.Query, only: [from: 2]
  alias TimeManager.Repo
  alias TimeManager.Accounts.User
  alias TimeManager.Hours.Workingtime
  alias Ecto.Changeset

  def list_users do
    Repo.all(from(u in User, preload: [:team, :role]))
  end

  def get_user!(id) do 
    User
    |> Repo.get!(id)
    |> Repo.preload([:team, :role])
  end

  def get_user_by_email(email) when is_binary(email) do
    Repo.get_by(User, email: email)
  end

  def get_user_by_username(username) when is_binary(username) do
    Repo.get_by(User, username: username)
  end

  def authenticate_user(email, plain_text_password) do
    query = from(u in User, where: u.email == ^email)

    case Repo.one(query) do
      nil ->
        Argon2.no_user_verify()
        {:error, :invalid_credentials}

      user ->
        if Argon2.verify_pass(plain_text_password, user.password) do
          {:ok, user}
        else
          {:error, :invalid_credentials}
        end
    end
  end

  def get_user_by_email_and_password(email, password)
      when is_binary(email) and is_binary(password) do
    Repo.get_by(User, email: email, password: password)
  end

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  alias TimeManager.Accounts.Team

  def list_teams do
    query = from(t in Team, preload: [:users])
    Repo.all(query)
  end

  def list_users_by_team(team_id) do
    query = from(u in User, where: u.team_id == ^team_id, preload: [:team, :role])
    Repo.all(query)
  end

  def list_workingtimes_by_team(user_id) do
    query = from(w in TimeManager.Hours.Workingtimes, where: w.user == ^user_id)
    Repo.all(query)
  end

  def get_team!(id) do
    Team
    |> Repo.get!(id)
    |> Repo.preload([:users])
  end

  def create_team(team_params) do
    name = Map.get(team_params, "name", nil)
    manager = Map.get(team_params, "manager", nil)
    users = Map.get(team_params, "users", nil)

    changeset = Team.changeset(%Team{}, %{name: name, manager: manager})

    if changeset.valid? do
      {:ok, new_team} = Repo.insert(changeset)

      if not is_nil(new_team) do
        Enum.each(users, fn user ->
          user = get_user!(user)

          if not is_nil(user) do
            update_user(user, %{team_id: new_team.id})
          else
            {:error, "User not found"}
          end
        end)
      end
      new_team = Repo.preload(new_team, :users)
    else
      {:error, changeset}
    end
  end

  def update_team(team, team_params) do
    name = Map.get(team_params, "name", nil)
    manager = Map.get(team_params, "manager", nil)
    users = Map.get(team_params, "users", nil)


    changeset = Team.changeset_update(team, %{name: name, manager: manager})

    if changeset.valid? do
      {:ok, updated_team} = Repo.update(changeset)

      if not is_nil(updated_team) do
        Enum.each(users, fn user ->
          user = get_user!(user)

          if not is_nil(user) do
            update_user(user, %{team_id: updated_team.id})
          else
            {:error, "User not found"}
          end
        end)
      end
      updated_team = Repo.preload(updated_team, :users)
    else
      {:error, changeset}
    end
  end

  def delete_team(%Team{} = team, users) do
    team = Repo.preload(team, :users)
    Enum.each users, fn(user) ->
      if not is_nil(user) do
        update_user(user, %{team_id: nil})
      else
        {:error, "User not found"}
      end
    end

    Repo.delete(team)
  end

  def remove_user_from_team(%User{} = user, user_id) do
    query = from(u in User, where: u.id == ^user.id)
    Repo.update_all(query, set: [team_id: nil])
  end

  def change_team(%Team{} = team, attrs \\ %{}) do
    Team.changeset(team, attrs)
  end

  alias TimeManager.Accounts.Role

  def list_roles do
    query = from(r in Role, preload: [:users])
    Repo.all(query)
  end

  def list_users_by_roles(role_id) do
    query = from(u in User, where: u.role_id == ^role_id, preload: [:team, :role])
    Repo.all(query)
  end

  def get_role!(id) do
    Role
    |> Repo.get!(id)
    |> Repo.preload([:users])
  end

  def create_role(role_params) do
    name = Map.get(role_params, "name", nil)
    users = Map.get(role_params, "users", nil)

    changeset = Role.changeset(%Role{}, %{name: name})

    if changeset.valid? do
      {:ok, new_role} = Repo.insert(changeset)

      if not is_nil(new_role) do
        Enum.each(users, fn user ->
          user = get_user!(user)
          if not is_nil(user) do
            update_user(user, %{role_id: new_role.id})
          else
            {:error, "User not found"}
          end
        end)
      end
      new_role = Repo.preload(new_role, :users)
    else
      {:error, changeset}
    end
  end

  def update_role(role, role_params) do
    name = Map.get(role_params, "name", nil)
    users = Map.get(role_params, "users", nil)

    if not is_nil(name) do
      changeset = Role.changeset_update(role, %{name: name})
      if changeset.valid? do
        {:ok, updated_role} = Repo.update(changeset)

        if not is_nil(updated_role) do
          Enum.each(users, fn user ->
            user = get_user!(user)

            if not is_nil(user) do
              update_user(user, %{role_id: updated_role.id})
            else
              {:error, "User not found"}
            end
          end)
        end
        updated_role = Repo.preload(updated_role, :users)
      else
        {:error, changeset}
      end
    else
      changeset = Role.changeset_update(role, %{name: role.name})

      if changeset.valid? do
        {:ok, updated_role} = Repo.update(changeset)

        if not is_nil(updated_role) do
          Enum.each(users, fn user ->
            user = get_user!(user)

            if not is_nil(user) do
              update_user(user, %{role_id: updated_role.id})
            else
              {:error, "User not found"}
            end
          end)
        end
        updated_role = Repo.preload(updated_role, :users)
      else
        {:error, changeset}
      end
    end
  end

  def delete_role(%Role{} = role, users) do
    role = Repo.preload(role, :users)
    Enum.each users, fn(user) ->
      if not is_nil(user) do
        update_user(user, %{role_id: nil})
      else
        {:error, "User not found"}
      end
    end
    Repo.delete(role)
  end

  def change_role(%Role{} = role, attrs \\ %{}) do
    Role.changeset(role, attrs)
  end
end
