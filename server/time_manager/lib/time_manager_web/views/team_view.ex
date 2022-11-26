defmodule TimeManagerWeb.TeamView do
  use TimeManagerWeb, :view
  alias TimeManagerWeb.TeamView
  alias TimeManagerWeb.UserView
  alias TimeManagerWeb.WorkingtimesView

  def render("index.json", %{teams: teams}) do
    %{data: render_many(teams, TeamView, "team.json")}
  end

  def render("show.json", %{team: team}) do
    %{data: render_one(team, TeamView, "team.json")}
  end

  def render("team.json", %{team: team}) do
    %{
      id: team.id,
      name: team.name,
      manager: team.manager,
      users: render_many(team.users, UserView, "user.json"),
    }
  end

  def render("show_users.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show_workingtimes.json", %{workingtimes: workingtimes}) do
    %{data: render_many(workingtimes, WorkingtimesView, "workingtimes.json")}
  end
  
  def render("error.json", %{message: message}) do
    %{error: message}
  end

  def render("success.json", %{message: message}) do
    %{success: message}
  end
end
