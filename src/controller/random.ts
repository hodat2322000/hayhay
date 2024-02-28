const random = (req: any, res: any) => {
    res.render("random");
}

const handleClick = (req: any, res: any) => {
    const mess = req.body;
    console.log(mess.message);
    res.json({addd: mess.message})
  }

  export default {handleClick, random}