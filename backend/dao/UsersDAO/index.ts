let users: any;

class UsersDAO {
  static async injectDB(conn: any) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.DATABASE_NAME).collection("users");
    } catch (error) {
      console.log(`connect db and collection users: ${error}`);
    }
  }

  static async addUser(profile: any) {
    const query = { username: profile.id };
    const user = await users.findOne(query);
    if (user?.username !== profile.id) {
      users.insertOne(profile);
    }
  }

  static async getUser(userId: string) {
    const query = { username: userId };
    const user = await users.findOne(query);
    return user;
  }
}

export default UsersDAO;
