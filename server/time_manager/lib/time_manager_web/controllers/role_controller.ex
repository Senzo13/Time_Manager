defmodule TimeManagerWeb.RoleController do
  use TimeManagerWeb, :controller

  alias TimeManager.Accounts
  alias TimeManager.Accounts.Role

  action_fallback TimeManagerWeb.FallbackController

  def index(conn, _params) do
    try do 
      roles = Accounts.list_roles()
      render(conn, "index.json", roles: roles)
    rescue
      e ->
        conn
        |> put_status(:not_found)
        |> render("error.json", message: "Bad request")
    end
  end

  def create(conn, %{"role" => role_params}) do
    roles = Accounts.list_roles()
    role = Enum.find(roles, fn role -> role.name == role_params["name"] end)
    if role != nil do 
      conn
      |> put_status(:conflict)
      |> render("error.json", message: "Role name already exists")
    else
      try do
        role = Accounts.create_role(role_params)
        conn
        |> put_status(:created)
        |> render("role.json", role: role)
      rescue
        e ->
          conn
          |> put_status(:bad_request)
          |> render("error.json", message: "Bad request")
      end
    end
  end

  def show(conn, %{"id" => id}) do
    role = Accounts.get_role!(id)
    render(conn, "show.json", role: role)
  end

  def update(conn, %{"id" => id, "role" => role_params}) do
    role = Accounts.get_role!(id)
    roles = Accounts.list_roles()
    exist_role = Enum.find(roles, fn role -> role.name == role_params["name"] end)

    if exist_role != nil do
      conn
      |> put_status(:conflict)
      |> render("error.json", message: "Role name already exists")
    else
      if role != [] do
        try do
          role = Accounts.update_role(role, role_params)
          conn
          |> put_status(:ok)
          |> render("role.json", role: role)
        rescue
          e ->
            conn
            |> put_status(:bad_request)
            |> render("error.json", message: "Bad request")
        end
      else
        conn
        |> put_status(:not_found)
        |> render("error.json", message: "Role not found")
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    role = Accounts.get_role!(id)
    users = Accounts.list_users_by_roles(id)
    if role != [] do
      try do
        Accounts.delete_role(role, users)
        conn
        |> put_status(:ok)
        |> render("success.json", message: "Role deleted")
      rescue
        e ->
        IO.inspect('####################################')
        IO.inspect(e)
        IO.inspect('####################################')
          conn
          |> put_status(:bad_request)
          |> render("error.json", message: "Bad request")
      end
    else
      conn
      |> put_status(:not_found)
      |> render("error.json", message: "Role not found")
    end
  end
end
