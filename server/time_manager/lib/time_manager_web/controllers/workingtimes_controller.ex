defmodule TimeManagerWeb.WorkingtimesController do
  use TimeManagerWeb, :controller

  alias TimeManager.Hours
  alias TimeManager.Hours.Workingtimes

  action_fallback(TimeManagerWeb.FallbackController)

  def show(conn, %{"id" => id, "user_id" => user_id}) do
    workingtime = Hours.get_workingtimes_with_userId(user_id, id)

    if workingtime do
      render(conn, "show.json", workingtimes: workingtime)
    else
      conn
      |> put_status(:not_found)
      |> json(%{message: "Workingtime not found"})
    end
  end

  def index_workingtimesByDay(conn, %{"user_id" => user_id}) do
    workingtime = Hours.get_workingtimes_with_only_userId(user_id)
    if workingtime != [] do
      render(conn, "index.json", workingtimes: workingtime)
    end
  end

  def indexAll(conn, _params) do
    workingtimes = Hours.list_workingtimes()

    if workingtimes != [] do
      render(conn, "index.json", workingtimes: workingtimes)
    else
      conn
      |> put_status(:not_found)
      |> json(%{message: "Any workingtimes found"})
    end
  end

  def show_withId(conn, %{"id" => id}) do
    workingtime = Hours.get_workingtimes!(id)

    if workingtime != [] do
      render(conn, "show.json", workingtimes: workingtime)
    else
      conn
      |> put_status(:not_found)
      |> json(%{message: "Workingtime not found"})
    end
  end

  # GET ALL WORKINGTIMES OF A USER WITH ID & START & END
  def index(conn, %{"user_id" => id, "start" => start, "end" => stop}) do
    workingtimes = Hours.get_workingtimes_with_userId_and_start_and_end(id, start, stop)

    if workingtimes != [] do
      render(conn, "index.json", workingtimes: workingtimes)
    else
      conn
      |> put_status(:not_found)
      |> json(%{message: "Workingtimes not found"})
    end
  end

  def create(conn, %{"user_id" => id, "workingtimes" => workingtimes_params}) do
    with {:ok, %Workingtimes{} = workingtimes} <-
           Hours.create_workingtimes(Map.put(workingtimes_params, "user", id)) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.workingtimes_path(conn, :create, workingtimes))
      |> render("show.json", workingtimes: workingtimes)
    end
  end

  def update(conn, %{"id" => id, "workingtimes" => workingtimes_params}) do
    workingtimes = Hours.get_workingtimes!(id)

    with {:ok, %Workingtimes{} = workingtimes} <-
           Hours.update_workingtimes(workingtimes, workingtimes_params) do
      render(conn, "show.json", workingtimes: workingtimes)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtimes = Hours.get_workingtimes!(id)

    if workingtimes != [] do
      with {:ok, %Workingtimes{}} <- Hours.delete_workingtimes(workingtimes) do
        send_resp(conn, :no_content, "")
      end
    else
      conn
      |> put_status(:not_found)
      |> json(%{message: "Workingtimes not found"})
    end
  end
end
