/*// ✅  steps to create authservice :

// Import Client, Account, ID.

// Make a class AuthService.

// Initialize Client.

// Configure with .setEndpoint & .setProject.

// Create Account.

// Add async functions: signup, login, get user, logout.

// Export object instead of class.*/

import config from "../config/config";
import {Client,Account,ID} from "appwrite";

export class AuthService{
    client = new Client()
    account;
    constructor (){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async createAccount({email,password,name}) {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount) {
                return this.login({email,password})
            }else {
               return userAccount
            }
        } catch (error) {
             throw error;
        }
    }
    async login ({email,password}){
        try {
           return await this.account.createEmailPasswordSession (email,password)
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser(){
        try {
            await this.account.get()
        } catch (error) {
             console.log("apperite service :: getCurrentUser :: error", error);
        }
        return null
    }
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite service :: logout :: error", error);
        }
    }
}
const authservice = new AuthService()
export default authservice