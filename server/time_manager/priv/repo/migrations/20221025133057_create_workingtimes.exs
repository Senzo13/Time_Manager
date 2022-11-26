defmodule TimeManager.Repo.Migrations.CreateWorkingtimes do
  use Ecto.Migration

  def change do
    create table(:workingtimes) do
      add :start, :utc_datetime, null: false
      add :end, :utc_datetime, null: false
      add :user, references(:users, on_delete: :nothing), null: false
      add :duration, :string
      add :break, :string

      timestamps()
    end

    create index(:workingtimes, [:user])
  end
end
