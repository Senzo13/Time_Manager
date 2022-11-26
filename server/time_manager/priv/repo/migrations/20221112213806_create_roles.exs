defmodule TimeManager.Repo.Migrations.CreateRoles do
  use Ecto.Migration

  def change do
    create table(:roles) do
      add :name, :string
      add :users, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:roles, [:users])
  end
end
