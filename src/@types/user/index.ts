export type UserProps = {
   id: string
   name: string
   username: string
   bio: string
   email: string
   emailVerified: Date
   image: string
   coverImage: string
   profileImage: string
   hashedPassword: string
   createdAt: Date
   updatedAt: Date
   followingIds: string
   hasNotification: boolean
}

export interface UserFollowersCountProps extends UserProps {
   followersCount: number
}
