defmodule TimeManagerWeb.Router do
  use TimeManagerWeb, :router

  pipeline :auth do
    plug(TimeManager.Accounts.Pipeline)
  end

  # We use ensure_auth to fail if there is no one logged in
  pipeline :ensure_auth do
    plug(Guardian.Plug.EnsureAuthenticated)
  end

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, {TimeManagerWeb.LayoutView, :root})
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :csrf do
    plug(:protect_from_forgery)
  end

  scope "/api", TimeManagerWeb do
    pipe_through(:api)
    # USERS ROUTES
    # LOGIN
    get("/users", UserController, :authenticate_user)
    # REGISTER
    post("/users", UserController, :create)
  end

  scope "/api/auth", TimeManagerWeb do

    pipe_through [:browser, :auth, :ensure_auth] # AUTHENTICATED ROUTES ONLY

    # USERS ROUTES
    get("/users", UserController, :index)
    get("/users/:id", UserController, :show)
    put("/users/:id", UserController, :update)
    delete("/users/:id", UserController, :delete)

    # WORKINGTIMES ROUTES
    get("/workingtimes", WorkingtimesController, :indexAll)
    get("/workingtimes/:user_id", WorkingtimesController, :index)
    get("/workingtime/:id", WorkingtimesController, :show_withId)
    get("/workingtimes/:user_id/:id", WorkingtimesController, :show)
    get("/workingtimesByDay/:user_id", WorkingtimesController, :index_workingtimesByDay)
    post("/workingtimes/:user_id", WorkingtimesController, :create)
    put("/workingtimes/:id", WorkingtimesController, :update)
    delete("/workingtimes/:id", WorkingtimesController, :delete)

    # CLOCKS ROUTES
    get("/clocks/:user_id", ClocksController, :show)
    post("/clocks/:user_id", ClocksController, :create)

    # TEAMS ROUTES
    get("/teams", TeamController, :index)
    get("/teams/:id", TeamController, :show)
    get("/teams/:id/users", TeamController, :show_users)
    get("/teams/:id/workingtimes", TeamController, :show_workingtimes)
    post("/teams", TeamController, :create)
    put("/teams/:id", TeamController, :update)
    delete("/teams/users/:user_id", TeamController, :remove_user)
    delete("/teams/:id", TeamController, :delete)

    # ROLES ROUTES
    get("/roles", RoleController, :index)
    get("/roles/:id", RoleController, :show)
    post("/roles", RoleController, :create)
    put("/roles/:id", RoleController, :update)
    delete("/roles/:id", RoleController, :delete)
    
  end
end
