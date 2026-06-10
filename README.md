# Sistema de Monitoramento de Missões

## 👥 Integrantes
- RM 565415 — Rafael Silva Oliveira Nascimento  
- RM 564572 — Pedro Noronha dos Santos  
- RM 561723 — Lucas Franco de Godoy Fortes  

---

## 📌 Objetivo
Este projeto implementa um sistema de monitoramento de missões espaciais, permitindo:
- Cadastro de missões
- Seleção da missão ativa
- Acompanhamento em tempo real de sensores, energia, comunicação e alertas

---

## 🗂️ Estrutura
O aplicativo é dividido em abas independentes:

- **Cadastro de Missão**: registra uma nova missão com nome e limite de temperatura.
- **Selecionar Missão**: lista todas as missões cadastradas e permite escolher a ativa.
- **Sensores**: mostra temperatura, pressão e umidade da missão.
- **Energia**: exibe nível da bateria, consumo atual e tempo restante.
- **Comunicação**: apresenta status da rede e intensidade do sinal.
- **Alertas**: gera avisos automáticos de energia crítica, temperatura acima do limite e falha de comunicação.

---

## ⚙️ Funcionamento
- Os dados das missões são armazenados localmente via **AsyncStorage**.
- Cada aba lê os dados da missão ativa e exibe as informações correspondentes.
- Os valores exibidos são definidos em objetos fixos (`Missão 001`, `Missão 002`, `Missão 003`).

---

## 🚨 Observação Importante
Para que os dados apareçam corretamente:
- O nome da missão cadastrada deve ser **idêntico** às chaves usadas nos objetos:
  - `"Missão 001"`
  - `"Missão 002"`
  - `"Missão 003"`

Se o nome for diferente (ex.: `missão001` ou `Missao 001` sem acento), os dados não serão carregados.

---

## 📲 Fluxo de Uso
1. **Cadastrar Missão** → insira o nome (ex.: `"Missão 001"`) e o limite de temperatura.
2. **Selecionar Missão** → escolha a missão cadastrada.
3. **Navegar pelas abas**:
   - Sensores → dados ambientais
   - Energia → status da bateria
   - Comunicação → rede e sinal
   - Alertas → avisos automáticos

---

## 🎥 Demonstração em Vídeo
Assista à demonstração completa do sistema:  
[Vídeo da entrega]([https://youtu.be/SEU-LINK-AQUI](https://youtube.com/shorts/V_XyZSafeaw?si=TbdG7joI7bg2bTl8))
