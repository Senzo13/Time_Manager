defmodule TimeManager.HoursFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `TimeManager.Hours` context.
  """

  @doc """
  Generate a workingtimes.
  """
  def workingtimes_fixture(attrs \\ %{}) do
    {:ok, workingtimes} =
      attrs
      |> Enum.into(%{
        end: ~U[2022-10-24 13:30:00Z],
        start: ~U[2022-10-24 13:30:00Z]
      })
      |> TimeManager.Hours.create_workingtimes()

    workingtimes
  end

  @doc """
  Generate a clocks.
  """
  def clocks_fixture(attrs \\ %{}) do
    {:ok, clocks} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~U[2022-10-24 13:32:00Z]
      })
      |> TimeManager.Hours.create_clocks()

    clocks
  end
end
