const postLogin = (req: any, res: any) => {
    const { uname, psw } = req.body;
    if (uname === "admin" && psw === "admin")
      res.render("index", {msg: "Chào All"});
    else res.json({ login: false, mes: "acc sai" });
  }

 const login = (req: any, res: any) => {
    res.render("login");
  }

  export default {postLogin, login}