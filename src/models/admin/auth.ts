// TODO: duplicate AuthenticatedUserProfile
export interface UserProfile {
  public_id: string;
  type: "admin" | "customer" | "breeder" | "service";
  approved: boolean;
}
