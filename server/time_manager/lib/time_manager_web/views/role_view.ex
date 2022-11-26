defmodule TimeManagerWeb.RoleView do
  use TimeManagerWeb, :view
  alias TimeManagerWeb.RoleView
  alias TimeManagerWeb.UserView

  def render("index.json", %{roles: roles}) do
    %{data: render_many(roles, RoleView, "role.json")}
  end

  def render("show.json", %{role: role}) do
    %{data: render_one(role, RoleView, "role.json")}
  end

  def render("role.json", %{role: role}) do
    %{
      id: role.id,
      name: role.name,
      users: render_many(role.users, UserView, "user.json"),
    }
  end
  
  def render("error.json", %{message: message}) do
    %{error: message}
  end

  def render("success.json", %{message: message}) do
    %{success: message}
  end
end
