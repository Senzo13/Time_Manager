defmodule TimeManager.Hours.Clocks do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clock" do
    field :status, :boolean, default: false
    field :time, :utc_datetime
    field :user, :id

    timestamps()
  end

  @doc false
  def changeset(clocks, attrs) do
    clocks
    |> cast(attrs, [:time, :status, :user])
    |> validate_required([:time, :status, :user])
  end
end
