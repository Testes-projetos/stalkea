import { useState, useEffect } from "react";
import styles from "./Chat1.module.css";
import chat1Av from "../assets/direct/chat1.png";
import ChatHeader from "../components/ChatComponents/ChatHeader";
import ChatBody from "../components/ChatComponents/ChatBody";
import ChatInput from "../components/ChatComponents/ChatInput";
import ChatMessageTime from "../components/ChatComponents/ChatMessageTime";
import ChatMessageOther from "../components/ChatComponents/ChatMessageOther";
import ChatMessageMe from "../components/ChatComponents/ChatMessageMe";
import ChatMessageImage from "../components/ChatComponents/ChatMessageImage";
import ChatAudioOther from "../components/ChatComponents/ChatAudioOther";
import OldMessage from "../components/ChatComponents/OldMessage";
import nudeImage from "../assets/chat/nudes1-chat1.jpg";

export default function Chat1() {
  const [city, setCity] = useState("casa");
  useEffect(() => {
    async function fetchLocation() {
      try {
        const res = await fetch("https://wtfismyip.com/json");
        if (!res.ok) return;

        const data = await res.json();

        if (data?.YourFuckingLocation) {
          const parts = data.YourFuckingLocation.split(",");
          setCity((parts[0] || "casa").trim());
        }
      } catch {}
    }

    fetchLocation();
  }, []);

  return (
    <div className={styles.chatPageChat1}>
      <ChatHeader username="Jo*****" avatar={chat1Av} status="Online" />
      <ChatBody>
        {/* ===== MENSAGENS MUITO ANTIGAS (BLUR FORTE) ===== */}
        <OldMessage>
          <ChatMessageTime time="1 SEMANA ATRÁS" />
          <ChatMessageOther text="Oi amor" />
          <ChatMessageMe text="Oi bb" />
          <ChatMessageOther text="Saudades" showAvatar={false} />
          <ChatMessageMe text="Tbm ❤️" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="6 DIAS ATRÁS" />
          <ChatMessageOther text="Bom dia 😘" />
          <ChatMessageMe text="Bom dia amor" />
          <ChatMessageOther text="Que horas sai?" showAvatar={false} />
          <ChatMessageMe text="Umas 18h" />
          <ChatMessageOther text="Blz" showAvatar={false} />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="5 DIAS ATRÁS" />
          <ChatMessageOther text="Oi delícia" />
          <ChatMessageMe text="Oii" />
          <ChatMessageMe text="To com sdd" />
          <ChatMessageOther text="Eu também amor" showAvatar={false} />
          <ChatMessageOther text="Vem me ver?" showAvatar={false} />
          <ChatMessageMe text="Vou sim" />
        </OldMessage>

        <OldMessage>
          <ChatMessageTime time="4 DIAS ATRÁS" />
          <ChatMessageOther text="E aí?" />
          <ChatMessageMe text="Fala" />
          <ChatMessageOther text="Nada, você sumiu" showAvatar={false} />
          <ChatMessageMe text="Desculpa, tava ocupado" />
          <ChatMessageOther text="Tá bom" showAvatar={false} reaction="😔" />
        </OldMessage>

        {/* ===== CONVERSA PRINCIPAL ===== */}
        <ChatMessageTime time="3 DIAS ATRÁS, 11:12" />

        <ChatMessageOther text="Oi minha delícia" />
        <ChatMessageMe text="Oi amor da minha vidq" />
        <ChatMessageMe text="vida*" />
        <ChatMessageOther text="To com saudade" showAvatar={false} />

        <ChatMessageImage
          imageSrc={nudeImage}
          reaction="❤️"
          showAvatar={false}
        />

        <ChatMessageOther text="Disso??" showAvatar={false} />
        <ChatMessageMe text="😍😍😍😍😍😍" />
        <ChatMessageOther text="Gostou amor?" showAvatar={false} />

        {/* ÁUDIO BLOQUEADO */}
        <ChatAudioOther duration="0:11" showAvatar={false} />

        <ChatMessageOther 
          text={`Fala pra ela que tem sim em ${city}`}
          showAvatar={false}
        />

        <ChatMessageMe text="Dboa, amanhã ou depois de amanhã" reaction="👍🏻" />

        <ChatMessageTime time="ONTEM, 21:34" />

        <ChatMessageOther text="Amor" />
        <ChatMessageOther text="Ta podendo falar?" showAvatar={false} />

        <ChatMessageMe 
          text="Oii bb"
          replyTo={{
            label: "Você respondeu",
            text: "Amor"
          }}
        />

        <ChatMessageOther 
          text="Perai que a vaca da Bruninha tá aqui do lado"
          blurWords={["vaca da Bruninha"]}
          showAvatar={false}
        />

        <ChatMessageMe text="kkkkkkkkk" />
        <ChatMessageOther text="🦌🦌🦌 kkkk" reaction="😂" showAvatar={false} />

        <ChatMessageOther 
          text={`Tô chegando em ${city} já, só pra avisar mesmo ❤️`}
          showAvatar={false}
          reaction="❤️"
        />

    
        <ChatMessageMe text="Vc vai ficar onde" />
        <ChatMessageMe text="Na sua prima?" />

        <ChatMessageOther 
          text="Não estou na casa dela hoje"
          replyTo={{
            label: "respondeu a você",
            text: "Na sua prima?"
          }}
        />

        <ChatMessageOther text={`Vou ficar um tempo la`} showAvatar={false} />
        <ChatMessageMe text="Tá bom 😘" />
        <ChatMessageMe text="Vou passar aí blz??" reaction="❤️" />

        <ChatMessageTime time="HOJE, 15:22" />

        {/* ÁUDIOS BLOQUEADOS */}
        <ChatAudioOther duration="0:32" />
        <ChatAudioOther duration="0:07" showAvatar={false} />

        <ChatMessageMe text="Pode deixar" />
        <ChatMessageOther text="❤️" showAvatar={false} />

        <ChatMessageTime time="16:53" />

        <ChatMessageOther text="Adivinha o que vc esqueceu aqui em cs" />
      </ChatBody>

      <ChatInput />
    </div>
  );
}