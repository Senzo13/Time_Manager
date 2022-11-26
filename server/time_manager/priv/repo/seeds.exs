alias TimeManager.Repo
alias TimeManager.Accounts.User
alias TimeManager.Accounts.Team
alias TimeManager.Accounts.Role
alias TimeManager.Hours.Workingtimes

# CREATE ROLES

Repo.insert!(%Role{  
  id: 1,
  name: "Global Admin",
})

Repo.insert!(%Role{  
  id: 2,
  name: "Manager"
})

Repo.insert!(%Role{  
  id: 3,
  name: "Users"
})

################################################

# CREATE USERS

Repo.insert!(%User{  
  username: "Cyril",
  email: "cyril.bancq@gmail.com",
  password: Argon2.hash_pwd_salt("cyril"),
  role_id: 2
})


Repo.insert!(%User{    
  username: "Issam",
  email: "issam@gmail.com",
  password: Argon2.hash_pwd_salt("issam"),
  role_id: 2
})



Repo.insert!(%User{    
  username: "Lorenzo",
  email: "lorenzo@gmail.com",
  password: Argon2.hash_pwd_salt("lorenzo"),
  role_id: 3
})



Repo.insert!(%User{    
  username: "Florian",
  email: "florian@gmail.com",
  password: Argon2.hash_pwd_salt("florian"),
  role_id: 3
})


Repo.insert!(%User{    
  username: "Global Admin",
  email: "admin@gmail.com",
  password: Argon2.hash_pwd_salt("admin"),
  role_id: 1
})


Repo.insert!(%User{    
  username: "Root",
  email: "root@gmail.com",
  password: Argon2.hash_pwd_salt("root"),
  role_id: 1
})


# CREATE TEAMS

Repo.insert!(%Team{  
  name: "Cloud",
  manager: 1
})

Repo.insert!(%Team{  
  name: "Web",
  manager: 2
})

Repo.insert!(%Team{  
  name: "Global Admin",
  manager: 5
})

Repo.insert!(%Team{  
  name: "Mobile",
  manager: 2
})

Repo.insert!(%Team{  
  name: "DevOps",
  manager: 1
})

Repo.insert!(%Team{  
  name: "Commerce",
  manager: 2
})

Repo.insert!(%Team{  
  name: "Digital",
  manager: 2
})

Repo.insert!(%Team{  
  name: "Data",
  manager: 1
})

Repo.insert!(%Team{  
  name: "Marketing",
  manager: 2
})

Repo.insert!(%Team{  
  name: "Finance",
  manager: 2
})

Repo.insert!(%Team{  
  name: "HR",
  manager: 2
})

Repo.insert!(%Team{  
  name: "Legal",
  manager: 2
})

Repo.insert!(%Team{  
  name: "Communication",
  manager: 2
})

Repo.insert!(%Team{  
  name: "Strategy",
  manager: 1
})

Repo.insert!(%Team{  
  name: "Business",
  manager: 2
})

# # CREATE RANDOM TEAMS

# for i <- 16..50 do
#   Repo.insert!(%Team{  
#     id: i,
#     name: FakerElixir.App.name(), 
#     manager: 5
#   })
# end
############################################


# CREATE RANDOM USERS

for i <- 7..254 do
  Repo.insert!(%User{    
    username: FakerElixir.Internet.user_name(),
    email: FakerElixir.Internet.email(:popular),
    password: Argon2.hash_pwd_salt("password"),
    role_id: 3,
    team_id: FakerElixir.Helper.pick(2..15)
  })
end

############################################