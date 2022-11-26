defmodule TimeManager.Hours do
  import Ecto.Query, warn: false
  alias TimeManager.Repo

  alias TimeManager.Hours.Workingtimes

  def list_workingtimes do
    Repo.all(Workingtimes)
  end

  def get_workingtimes!(id), do: Repo.get!(Workingtimes, id)

  def get_workingtimes_with_userId(user_id, id) do
    Repo.get_by(Workingtimes, user: user_id, id: id)
  end

  def get_workingtimes_with_only_userId(user_id) do
    Repo.all(from(w in Workingtimes, where: w.user == ^user_id))
  end

  def get_workingtimes_with_userId_and_start_and_end(id, start, ending) do
    Repo.all(
      from(w in Workingtimes, where: w.user == ^id and w.start >= ^start and w.end <= ^ending)
    )
  end

  def create_workingtimes(attrs \\ %{}) do
    %Workingtimes{}
    |> Workingtimes.changeset(attrs)
    |> Repo.insert()
  end

  def update_workingtimes(%Workingtimes{} = workingtimes, attrs) do
    workingtimes
    |> Workingtimes.changeset(attrs)
    |> Repo.update()
  end

  def delete_workingtimes(%Workingtimes{} = workingtimes) do
    Repo.delete(workingtimes)
  end

  def change_workingtimes(%Workingtimes{} = workingtimes, attrs \\ %{}) do
    Workingtimes.changeset(workingtimes, attrs)
  end

  ############### CLOCK ###############

  alias TimeManager.Hours.Clocks

  def list_clock do
    Repo.all(Clocks)
  end

  def get_clocks!(id), do: Repo.get!(Clocks, id)

  def get_clocks_with_userId(user_id) do
    Repo.all(from(c in Clocks, where: c.user == ^user_id))
  end

  def create_clocks(attrs \\ %{}) do
    %Clocks{}
    |> Clocks.changeset(attrs)
    |> Repo.insert()
  end

  def create_clocks_with_userId(attrs \\ %{}, id) do
    %Clocks{}
    |> Clocks.changeset(attrs)
    |> Map.put(:user, id)
    |> Repo.insert()
  end

  def update_clocks(%Clocks{} = clocks, attrs) do
    clocks
    |> Clocks.changeset(attrs)
    |> Repo.update()
  end

  def delete_clocks(%Clocks{} = clocks) do
    Repo.delete(clocks)
  end

  def change_clocks(%Clocks{} = clocks, attrs \\ %{}) do
    Clocks.changeset(clocks, attrs)
  end
end
