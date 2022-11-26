defmodule TimeManager.Hours.Workingtimes do
  use Ecto.Schema
  import Ecto.Changeset

  schema "workingtimes" do
    field :end, :utc_datetime
    field :start, :utc_datetime
    field :user, :id
    field :duration, :string
    field :break, :string

    timestamps()
  end

  @doc false
  def changeset(workingtimes, attrs) do
    workingtimes
    |> cast(attrs, [:start, :end, :user, :duration, :break])
    |> validate_required([:start, :end, :user])
  end
end
