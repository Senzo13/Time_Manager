defmodule TimeManager.Repo.Migrations.CreateTeams do
  use Ecto.Migration

  def change do
    create table(:teams) do
      add :name, :string
      add :users, references(:users, on_delete: :nothing)
      add :manager, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:teams, [:users])
    create index(:teams, [:manager])
  end
end
