import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Mail, mails } from "./data";

type Config = {
  selected: Mail["id"];
};

type MailType = {
  mail: Config;
  setMail: Dispatch<SetStateAction<Config>>;
};

const MailContext = createContext<MailType | null>(null);

export const MailProvider = ({ children }: { children: React.ReactNode }) => {
  const [mail, setMail] = useState<Config>({
    selected: mails[0].id,
  });
  const value = { mail, setMail };
  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
};

export function useMail() {
  const context = useContext(MailContext);
  if (context === undefined) {
    throw new Error("useMail must be used within a MailProvider");
  }
  return context;
}
