export const getDashboard = async (req, res) => {
  try {
    const user = req.user
    console.log(user)
    res.status(200).json({
      success: true,
      message: "welcome to the dashboard",
      username: user.username,
      email: user.email
    })
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}
