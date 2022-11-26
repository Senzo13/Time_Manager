defmodule TimeManager.Repo.Migrations.AddRolesUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :role_id, references(:roles, on_delete: :nothing)
    end
  end
end
