import { injectable } from "inversify";

export interface IMessageBus
{
    // Send(message: IQuery | ICommand): Promise<any>;
}

@injectable()
export class MessageBus
{
    public Url: string = 'http://localhost:4000/CqrsBus';

    async Send(message: any, isPrimitive = false): Promise<object | string>
    {
        try
        {
            console.log("Sending", message, "...");

            const serializedMessage = JSON.stringify(message);

            const requestConfig = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: serializedMessage
            };

            const start = +(new Date());

            // const response = await fetch('http://localhost:4000/CqrsBus', requestConfig);
            // const response = await fetch('http://192.168.43.225:4000/CqrsBus', requestConfig);
            const response = await fetch(this.Url, requestConfig);

            if (response.ok)
            {
                let result = null;

                if (isPrimitive)
                {
                    result = await response.text();

                    if (result === "") result = "(empty)";
                }
                else 
                {
                    result = await response.json();
                }

                console.log(`Result:`, result, ` (took ${ +(new Date()) - start } ms)`);

                return result;
            }
            else
            {
                const errorMessage = await response.text();

                throw new Error(errorMessage);
            }
        }
        catch (error)
        {
            console.log("MESSAGE BUS ERROR:", error);

            throw new Error(error);
        }
    }
}