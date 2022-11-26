defmodule TimeManagerWeb.UserController do
  use TimeManagerWeb, :controller
  alias TimeManager.Accounts
  alias TimeManager.Accounts.User
  alias TimeManager.Accounts.Guardian

  action_fallback(TimeManagerWeb.FallbackController)

  def index(conn, %{"email" => email, "password" => password}) do
    user = Accounts.get_user_by_email_and_password(email, password)
    if user do
      render(conn, "show.json", user: user)
    else
      conn
      |> put_status(:not_found)
      |> json(%{message: "User not found"})
    end
  end

  def authenticate_user(conn, %{"email" => email, "password" => password}) do
    case Accounts.authenticate_user(email, password) do
      {:ok, user} ->
      role = Accounts.get_role!(user.role_id)
      {:ok, token, _claims} = 
      Guardian.encode_and_sign(user, %{"typ" => "access", "sub" => user.id, "username" => user.username, "email" => user.email, "role" => role.name}, secret_key: {System.get_env("SECRET_KEY_PASSPHRASE"), "secret"})

      {:ok, refresh_token, _claims} = 
      Guardian.encode_and_sign(user, %{}, token_type: "refresh")
      
      conn
      |> put_status(:created)
      |> put_resp_header("ruid", refresh_token)
      |> put_resp_header("authorization", "access " <> token)
      |> render("token.json", token: token)
      {:error, reason} ->
      conn
      |> put_status(:unauthorized)
      |> render("error.json", message: reason)
      end
  end

  def index(conn, %{"email" => email}) do
    user = Accounts.get_user_by_email(email)
    if user do
      render(conn, "show.json", user: user)
    else
      conn
      |> put_status(:not_found)
      |> json(%{message: "User not found"})
    end
  end

  def index(conn, %{"username" => username}) do
    user = Accounts.get_user_by_username(username)
    if user do
      render(conn, "show.json", user: user)
    else
      conn
      |> put_status(:not_found)
      |> json(%{message: "User not found"})
    end
  end

  def index(conn, _params) do
    users = Accounts.list_users()

    if users != [] do
      render(conn, "index.json", users: users)
    else
      conn
      |> put_status(:not_found)
      |> json(%{message: "User not found"})
    end
  end

  def create(conn, %{"user" => user_params}) do
    users = Accounts.list_users()
    user_exist = Enum.find(users, fn user -> user.email == user_params["email"] end)

    if user_exist != nil do 
      conn
      |> put_status(:conflict)
      |> json(%{message: "User already exist"})
    else
      try do 
        {:ok, user} = Accounts.create_user(user_params)
        conn
          |> put_status(:created)
          |> render("show.json", user: user)
      rescue
        e ->
        IO.inspect('####################################')
        IO.inspect(e)
        IO.inspect('####################################')
          conn
          |> put_status(:unprocessable_entity)
          |> json(%{message: "Bad request"})
      end
    end

    # if user != nil do
    #   try do
    #     case { user.email == user_params["email"], user.password == user_params["password"] } do
    #       {true, true} ->
    #         conn
    #         |> put_status(:conflict)
    #         |> json(%{message: "User already exists"})
    #       {true, false} ->
    #         conn
    #         |> put_status(:conflict)
    #         |> json(%{message: "Email already exists"})
    #       {false, false} ->
    #       with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
    #         render(conn, "show.json", user: user)
    #       end
    #     end
    #   rescue
    #     e  ->
    #             IO.inspect('####################################')
    #     IO.inspect(e)
    #     IO.inspect('####################################')
    #       conn
    #       |> put_status(:not_found)
    #       |> json(%{message: "User not found"})
    #   end
    # else
    #   with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
    #   render(conn, "show.json", user: user)
    #   end
    #   end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    if user != [] do
      render(conn, "show.json", user: user)
    else
      conn
      |> put_status(:not_found)
      |> json(%{message: "User not found"})
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    try do
    user = Accounts.get_user!(id)
    if user != [] do
      with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      role = Accounts.get_role!(user.role_id)
      {:ok, refresh_token, _claims} = 
      Guardian.encode_and_sign(user, %{"typ" => "access", "sub" => user.id, "username" => user.username, "email" => user.email, "role" => role.name}, secret_key: {System.get_env("SECRET_KEY_PASSPHRASE"), "secret"}, token_type: "refresh")
        conn
        |> put_status(:ok)
        |> put_resp_header("authorization", "access " <> refresh_token)
        |> render("token.json", token: refresh_token)
        # |> render("show.json", user: user)
      end
      end
    rescue
      _ in Ecto.NoResultsError ->
        conn
        |> put_status(:not_found)
        |> json(%{message: "User not found"})
    end
  end

  def delete(conn, %{"id" => id}) do
    try do
      user = Accounts.get_user!(id)
      if user != [] do
        with {:ok, %User{}} <- Accounts.delete_user(user) do
          conn
          |> put_status(:not_found)
          |> json(%{message: "User deleted"})
        end
      end
    rescue
      _ in Ecto.NoResultsError ->
        conn
        |> put_status(:not_found)
        |> json(%{message: "User not found"})
    end
  end
end
