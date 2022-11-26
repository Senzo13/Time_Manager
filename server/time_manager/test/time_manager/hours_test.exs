defmodule TimeManager.HoursTest do
  use TimeManager.DataCase

  alias TimeManager.Hours

  describe "workingtimes" do
    alias TimeManager.Hours.Workingtimes

    import TimeManager.HoursFixtures

    @invalid_attrs %{end: nil, start: nil}

    test "list_workingtimes/0 returns all workingtimes" do
      workingtimes = workingtimes_fixture()
      assert Hours.list_workingtimes() == [workingtimes]
    end

    test "get_workingtimes!/1 returns the workingtimes with given id" do
      workingtimes = workingtimes_fixture()
      assert Hours.get_workingtimes!(workingtimes.id) == workingtimes
    end

    test "create_workingtimes/1 with valid data creates a workingtimes" do
      valid_attrs = %{end: ~U[2022-10-24 13:30:00Z], start: ~U[2022-10-24 13:30:00Z]}

      assert {:ok, %Workingtimes{} = workingtimes} = Hours.create_workingtimes(valid_attrs)
      assert workingtimes.end == ~U[2022-10-24 13:30:00Z]
      assert workingtimes.start == ~U[2022-10-24 13:30:00Z]
    end

    test "create_workingtimes/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Hours.create_workingtimes(@invalid_attrs)
    end

    test "update_workingtimes/2 with valid data updates the workingtimes" do
      workingtimes = workingtimes_fixture()
      update_attrs = %{end: ~U[2022-10-25 13:30:00Z], start: ~U[2022-10-25 13:30:00Z]}

      assert {:ok, %Workingtimes{} = workingtimes} = Hours.update_workingtimes(workingtimes, update_attrs)
      assert workingtimes.end == ~U[2022-10-25 13:30:00Z]
      assert workingtimes.start == ~U[2022-10-25 13:30:00Z]
    end

    test "update_workingtimes/2 with invalid data returns error changeset" do
      workingtimes = workingtimes_fixture()
      assert {:error, %Ecto.Changeset{}} = Hours.update_workingtimes(workingtimes, @invalid_attrs)
      assert workingtimes == Hours.get_workingtimes!(workingtimes.id)
    end

    test "delete_workingtimes/1 deletes the workingtimes" do
      workingtimes = workingtimes_fixture()
      assert {:ok, %Workingtimes{}} = Hours.delete_workingtimes(workingtimes)
      assert_raise Ecto.NoResultsError, fn -> Hours.get_workingtimes!(workingtimes.id) end
    end

    test "change_workingtimes/1 returns a workingtimes changeset" do
      workingtimes = workingtimes_fixture()
      assert %Ecto.Changeset{} = Hours.change_workingtimes(workingtimes)
    end
  end

  describe "clock" do
    alias TimeManager.Hours.Clocks

    import TimeManager.HoursFixtures

    @invalid_attrs %{status: nil, time: nil}

    test "list_clock/0 returns all clock" do
      clocks = clocks_fixture()
      assert Hours.list_clock() == [clocks]
    end

    test "get_clocks!/1 returns the clocks with given id" do
      clocks = clocks_fixture()
      assert Hours.get_clocks!(clocks.id) == clocks
    end

    test "create_clocks/1 with valid data creates a clocks" do
      valid_attrs = %{status: true, time: ~U[2022-10-24 13:32:00Z]}

      assert {:ok, %Clocks{} = clocks} = Hours.create_clocks(valid_attrs)
      assert clocks.status == true
      assert clocks.time == ~U[2022-10-24 13:32:00Z]
    end

    test "create_clocks/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Hours.create_clocks(@invalid_attrs)
    end

    test "update_clocks/2 with valid data updates the clocks" do
      clocks = clocks_fixture()
      update_attrs = %{status: false, time: ~U[2022-10-25 13:32:00Z]}

      assert {:ok, %Clocks{} = clocks} = Hours.update_clocks(clocks, update_attrs)
      assert clocks.status == false
      assert clocks.time == ~U[2022-10-25 13:32:00Z]
    end

    test "update_clocks/2 with invalid data returns error changeset" do
      clocks = clocks_fixture()
      assert {:error, %Ecto.Changeset{}} = Hours.update_clocks(clocks, @invalid_attrs)
      assert clocks == Hours.get_clocks!(clocks.id)
    end

    test "delete_clocks/1 deletes the clocks" do
      clocks = clocks_fixture()
      assert {:ok, %Clocks{}} = Hours.delete_clocks(clocks)
      assert_raise Ecto.NoResultsError, fn -> Hours.get_clocks!(clocks.id) end
    end

    test "change_clocks/1 returns a clocks changeset" do
      clocks = clocks_fixture()
      assert %Ecto.Changeset{} = Hours.change_clocks(clocks)
    end
  end
end
