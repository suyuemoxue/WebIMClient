export interface Message {
	sendId: string
	receiveId: string
	content: string
	msgType: string
	mediaType: string
}

export type Messages = Message[]
