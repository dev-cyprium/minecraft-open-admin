# minecraft-admin-front

This project is aimed to be a complete full stack solution for managing and monitoring
a minecraft server. Either modded or normal, the mod doesn't really care as long
as you have a starting script.

Heck, you can even use it to monitor **any** sh long lived process, as it's build
with easy config in mind. I'm planning to make this tool multi purpose in the future.

## Up and running
Before doing anything, please make sure you fill-in all the variables according the the `.env.example` file located in the project root.
```
yarn install
yarn serve
yarn api
```

Make sure to run both `serve` and `api` and to properly configure them, as both servers
are needed to do developing. Hot-reloading is included with this project thanks to the
great power of `vue-cli`

Feel free to run the tests, but the project doesn't have any at this point:
```
yarn test
```

## Setup
You can set this up on your server following the guide on [here](#)

## Contribution
I'm more then happy to receive help. If you find anything that you want/need from this tool
please submit an issue or a pull request and I'll be more then happy to look into it!