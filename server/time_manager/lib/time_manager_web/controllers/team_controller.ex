defmodule TimeManagerWeb.TeamController do
  use TimeManagerWeb, :controller

  alias TimeManager.Accounts
  alias TimeManager.Accounts.Team

  action_fallback(TimeManagerWeb.FallbackController)

  def index(conn, _params) do
    teams = Accounts.list_teams()

    if teams != [] do
      render(conn, "index.json", teams: teams)
    else
      conn
      |> put_status(:not_found)
      |> render("error.json", message: "Any Teams found")
    end
  end

  def create(conn, %{"team" => team_params}) do
  teams = Accounts.list_teams()
  exist_team = Enum.find(teams, fn team -> team.name == team_params["name"] end)

    if exist_team != nil do
      conn
        |> put_status(:not_found)
        |> render("error.json", message: "Team already exist with this name")
    else
      try do
        team = Accounts.create_team(team_params)
        conn
        |> put_status(:created)
        |> render("team.json", team: team)
      rescue
        e ->
          conn
          |> put_status(:bad_request)
          |> render("error.json", message: "Bad request")
      end
    end
  end

  def show(conn, %{"id" => id}) do
    team = Accounts.get_team!(id)

    if team != [] do
      conn
      |> put_status(:ok)
      |> render("show.json", team: team)
    else
      conn
      |> put_status(:not_found)
      |> render("error.json", message: "Team not found")
    end
  end

  def show_users(conn, %{"id" => id}) do
    team = Accounts.get_team!(id)
    if team != [] do
      users = Accounts.list_users_by_team(id)
      if users != [] do
        conn
        |> put_status(:ok)
        |> render("show_users.json", users: users)
      else
        conn
        |> put_status(:not_found)
        |> render("error.json", message: "Any Users found")
      end
    else
      conn
      |> put_status(:not_found)
      |> render("error.json", message: "Team not found")
    end
  end

  def show_workingtimes(conn, %{"id" => id}) do
    team = Accounts.get_team!(id)

    if team != [] do
      try do 
        users = Accounts.list_users_by_team(id)
        workingtimes_users = Enum.map(users, fn user -> Accounts.list_workingtimes_by_team(user.id) end)
        workingtimes = Enum.reduce(workingtimes_users, [], fn x, acc -> acc ++ x end)
        if workingtimes != [] do
          conn
          |> put_status(:ok)
          |> render("show_workingtimes.json", workingtimes: workingtimes)
        else
          conn
          |> put_status(:not_found)
          |> render("error.json", message: "Any Workingtimes found in this Team")
        end
      rescue
        e ->
          conn
          |> put_status(:bad_request)
          |> render("error.json", message: "Bad request")
      end
    else
      conn
      |> put_status(:not_found)
      |> render("error.json", message: "Team not found")
    end
  end

  def update(conn, %{"id" => id, "team" => team_params}) do
    team = Accounts.get_team!(id)

    if team != [] do
      try do
        team = Accounts.update_team(team, team_params)
        conn
        |> put_status(:ok)
        |> render("team.json", team: team)
      rescue
        e ->
        IO.inspect('####################################')
        IO.inspect(e)
        IO.inspect('####################################')
          conn
          |> put_status(:bad_request)
          |> render("error.json", message: "Bad request")
      end
    else
      conn
      |> put_status(:not_found)
      |> render("error.json", message: "Team not found")
    end
  end

  def delete(conn, %{"id" => id}) do
    team = Accounts.get_team!(id)
    users = Accounts.list_users_by_team(id)
    if team != [] do
      try do
        Accounts.delete_team(team, users)
        conn
        |> put_status(:ok)
        |> render("success.json", message: "Team deleted")
      rescue
        e ->
        IO.inspect('####################################')
        IO.inspect(e)
        IO.inspect('####################################')
          conn
          |> put_status(:bad_request)
          |> render("error.json", message: "Bad request")
      end
    else
      conn
      |> put_status(:not_found)
      |> render("error.json", message: "Team not found")
    end
  end

  def remove_user(conn, %{"user_id" => user_id}) do
    user = Accounts.get_user!(user_id)

    if user != [] do
      if user.team_id != nil do
        try do
          Accounts.remove_user_from_team(user, user_id)
          conn
          |> put_status(:ok)
          |> render("success.json", message: "User removed from Team")
        rescue
          e ->
            conn
            |> put_status(:bad_request)
            |> render("error.json", message: "Bad request")
        end
      else
        conn
        |> put_status(:not_found)
        |> render("error.json", message: "User not in a Team")
      end
    else
      conn
      |> put_status(:not_found)
      |> render("error.json", message: "User not found")
    end
  end
end
