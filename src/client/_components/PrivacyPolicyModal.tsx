import { useState } from "react";
import privicyPolicyModalStyles from "../../styles/privacypolicymodal.module.css"; // Estilos específicos para este modal


interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const PrivacyPolicyModal = ({ onClose }: PrivacyPolicyModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePrivacyPolicy = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={privicyPolicyModalStyles.modal}>
      <section className={privicyPolicyModalStyles.content}>
        <h1>Política de Privacidade</h1>
        <h2>1. Introdução</h2>
          <p>
            Bem-vindo(a) ao site da [<strong>Bruna Alves</strong>]! Respeitamos sua privacidade e estamos
            comprometidos em proteger seus dados pessoais. Esta política explica como coletamos, usamos
            e protegemos suas informações, de acordo com a <strong>Lei Geral de Proteção de Dados (LGPD)
            – Brasil</strong> e o <strong>General Data Protection Regulation (GDPR) – Reino Unido</strong>.
          </p>
        <h2>2. Dados Coletados</h2>
          <p>Podemos coletar os seguintes dados quando você utiliza nosso site ou entra em contato:</p>
            <ul>
              {/* <li>Nome e e-mail (quando você preenche um formulário ou entra em contato);</li> */}
              <li>Informações sobre sua navegação no site (cookies e tecnologias semelhantes).</li>
            </ul>
        <h2>3. Uso das Informações</h2>
          <p>Seus dados podem ser utilizados para:</p>
            <ul>
              <li>Responder a dúvidas e solicitações;</li>
              <li>Agendar sessões fotográficas;</li>
              <li>Melhorar a experiência do usuário no site;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
        <h2>4. Compartilhamento de Dados</h2>
          <p>
            Não vendemos nem compartilhamos seus dados com terceiros, exceto quando necessário para
            cumprir obrigações legais ou quando houver consentimento explícito.
          </p>
        <h2>5. Armazenamento e Segurança</h2>
          <p>
            Seus dados são armazenados de maneira segura e protegidos contra acessos não autorizados.
            Implementamos medidas técnicas e organizacionais para garantir a segurança das suas informações.
          </p>
        <h2>6. Seus Direitos</h2>
          <p>Você tem o direito de:</p>
            <ul>
              <li>Solicitar acesso aos seus dados;</li>
              <li>Corrigir informações incorretas;</li>
              <li>Pedir a exclusão dos seus dados (salvo quando houver necessidade legal de retenção);</li>
              <li>Retirar seu consentimento para o uso dos dados.</li>
            </ul>
          <p>Se desejar exercer algum desses direitos, entre em contato pelo e-mail: 
            <strong>brunaphoto.sfa@gmail.com</strong>.
          </p>
        <h2>7. Cookies</h2>
          <p>
            Nosso site pode usar cookies para melhorar sua experiência. Você pode desativá-los nas
            configurações do seu navegador, mas isso pode afetar algumas funcionalidades do site.
          </p>
        <h2>8. Alterações na Política</h2>
          <p>
            Esta política pode ser atualizada a qualquer momento para garantir conformidade com as leis
            aplicáveis. Recomendamos que você consulte esta página periodicamente.
          </p>
        <h2>9. Contato</h2>
          <p>Se tiver dúvidas sobre esta Política de Privacidade, entre em contato:</p>
          <p>📧 <strong>E-mail:</strong> brunaphoto.sfa@gmail.com</p>          
          <div className={privicyPolicyModalStyles.buttonContainer}>
          <button className={privicyPolicyModalStyles.closeButton} onClick={onClose}>Fechar</button>            
          </div>          
      </section>
    </div>
  );
};

export default PrivacyPolicyModal;