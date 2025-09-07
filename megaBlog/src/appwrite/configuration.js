import config from "../config/config";
import {Client,Databases,ID,Storage,Query} from "appwrite";

export class Service{
client = new Client;
databases;
bucket;
constructor(){
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
}
async createPost({title,slug,content,featuredImage,status,userId}){
    try {
        return await this.databases.createDocument(config.appwriteDatabaseId,

             config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
    )
    } catch (error) {
        console.log("appwrite service :: createPost :: error", error);
        
    }
}
async updatePost (slug,{title,content,featuredImage,status}){
try {
    return await this.databases.updateDocument(config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
            title, 
            content,
            featuredImage,
            status,
        }
    )
} catch (error) {
    console.log("appwrite service :: updatePost :: error", error);
}
}
async deletePost(slug){
    try {
        await this.databases.deleteDocument(config.appwriteDatabaseId, 
            config.appwriteCollectionId,
            slug)
            return true
    } catch (error) {
        console.log("appwrite service :: deletePost :: error", error);
        return false
    }
}
async getPost(slug){
    try {
         if (!slug) {
            throw new Error("Slug parameter is required");
        }
        return await this.databases.getDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)
    } catch (error) {
        console.log("appwrite service :: getPost :: error", error);
        return null;
    }

}
async getPosts(queries=[Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries,
        )
    } catch (error) {
        console.log("appwrite service :: deletePosts :: error", error);
        return false
    }
}


// file upload method
async uploadFile(file){
    try {
         return await this.bucket.createFile(config.appwriteBucketId,
            ID.unique(),
            file,
        )
    } catch (error) {
        console.log("appwrite service :: uploadFile :: error", error);
        return false
    }
}
async deleteFile(fileId){
try {
    await this.bucket.deleteFile(config.appwriteBucketId,fileId)
    return true
} catch (error) {
    console.log("appwrite service :: deleteFile :: error", error);
    return false
}
}
async getFilePreview(fileId){
            try {
            if (!fileId) {
                console.warn("No fileId provided to getFilePreview");
                return null;
            }
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId,
                2000, // width
                2000, // height
                "center", // gravity
                100 // quality
            ).toString();
        } catch (error) {
            console.log("appwrite service :: getFilePreview :: error", error);
            return null;
        }
}
}
const service = new Service()
export default service