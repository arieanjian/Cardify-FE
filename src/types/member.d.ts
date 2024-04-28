interface Imember {
  _id: string;
  userInfo: IUser;
  role: "Owner" | "Member" | "Admin";
}

interface IaddMember extends Imember {
  workspaceId: string;
}
