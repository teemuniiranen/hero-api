include {
  path = find_in_parent_folders()
}

terraform {
    source = "../../..//infra"

    before_hook "npm install" {
      commands     = ["apply", "plan", "destroy"]
      execute      = ["npm", "install"]
    }

    before_hook "npm run bundle" {
      commands     = ["apply", "plan", "destroy"]
      execute      = ["npm", "run", "bundle"]
    }

    before_hook "npm test" {
      commands     = ["apply", "plan"]
      execute      = ["npm", "run", "test"]
    }
}

inputs = {
    env = "dev"
    nameprefix = "hero"
}
