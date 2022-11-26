defmodule TimeManager.Accounts.Role do
  use Ecto.Schema
  import Ecto.Changeset
  alias TimeManager.Accounts.User

  schema "roles" do
    field :name, :string
    has_many :users, User

    timestamps()
  end

  @doc false
  def changeset(role, attrs) do
    role
    |> cast(attrs, [:name])
    |> cast_assoc(:users)
    |> validate_required([:name])
  end

  def changeset_update(role, attrs) do
    role
    |> cast(attrs, [:name])
    |> cast_assoc(:users)
  end
end
