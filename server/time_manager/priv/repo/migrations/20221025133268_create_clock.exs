defmodule TimeManager.Repo.Migrations.CreateClock do
  use Ecto.Migration

  def change do
    create table(:clock) do
      add :time, :utc_datetime, null: false
      add :status, :boolean, default: false, null: false
      add :user, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:clock, [:user])
  end
end
