defmodule TimeManagerWeb.UserView do
  use TimeManagerWeb, :view
  alias TimeManagerWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("token.json", %{token: token}) do
    %{access: "Bearer " <> token}
  end

  def render("token.json", %{refresh_token: refresh_token}) do
    %{access: "Bearer " <> refresh_token}
  end

  def render("error.json", %{message: message}) do
    %{error: message}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email,
      role_id: user.role_id,
      team_id: user.team_id,
    }
  end
end
