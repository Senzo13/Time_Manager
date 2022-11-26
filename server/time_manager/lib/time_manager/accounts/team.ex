defmodule TimeManager.Accounts.Team do
  use Ecto.Schema
  import Ecto.Changeset
  alias TimeManager.Accounts.User

  schema "teams" do
    field :name, :string
    field :manager, :id
    has_many :users, User

    timestamps()
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:name, :manager])
    |> cast_assoc(:users)
    |> validate_required([:name, :manager])
  end

  def changeset_update(team, attrs) do
    team
    |> cast(attrs, [:name, :manager])
    |> cast_assoc(:users)
  end

end
