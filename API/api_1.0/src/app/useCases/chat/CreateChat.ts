import { Request, Response, request } from "express";
import { Chat } from "../../models/Chat";

export async function CreateChat(req: Request, res: Response) {
    const {sender, receiver, senderPrivilege, receiverPrivilege} = req.body;
    const authors = [
        {
        "author": sender,
        "onModel": senderPrivilege
        },
        {
        "authot": receiver,
        "onModel": receiverPrivilege
        }
    ]
    const chat = new Chat({authors});

    try {
        chat.save();
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(({error: "Error on registering doctor"}));
    }
}