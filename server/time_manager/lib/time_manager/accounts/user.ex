defmodule TimeManager.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias TimeManager.Accounts.Team
  alias TimeManager.Accounts.Role

  schema "users" do
    field :email, :string
    field :username, :string
    field :password, :string
    belongs_to :team, Team
    belongs_to :role, Role


    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :password, :role_id, :team_id])
    |> validate_required([:username, :email, :password])
    |> put_password_hash()
  end

  defp put_password_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, password: Argon2.hash_pwd_salt(password))
  end

  defp put_password_hash(changeset), do: changeset
end

