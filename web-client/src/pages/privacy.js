import React from 'react';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import PageTitle from 'components/page-title';

function Privacy() {
  return (
    <MainLayout>
      <Container>
        <PageTitle title="Privacy" />
        <div>
          <p>&nbsp;</p>
          <ol style={{ listStyleType: 'upper-alpha' }}>
            <li>
              <h2>Registo em Gestão de encomendas</h2>
              <p>
                Titular de recolha dos dados: MOC, lda.<br></br>
                Representante do tratamento dos dados: rep_dpo@ge.lapr5.com<br></br>
                DPO: dpo@ge.lapr5.com<br></br>
              </p>
              <h3>Direito ao esquecimento</h3>
              <p>
                O direito ao esquecimento é salvaguardado caso não exista nenhum processo legal pendente
                que envolva a empresa que o agente represente. O uso então é justificado para potenciais
                provas a ser usado em tribunal.
              </p>

              <p>
                O pedido pode ser feito para <a href="mailto:dpo@ge.isep.3na.pt">dpo@ge.isep.3na.pt</a>
              </p>
              <ol style={{ listStyleType: 'lower-roman' }}>
                <li>
                  <strong>
                    Durante o registo de cliente na componente de Gestão de Encomendas, será solicitado
                    ao agente os seguintes dados:
                  </strong>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>
                      <p>Primeiro e último nome;</p>
                    </li>
                    <li>
                      <p>Número de Identificação Fiscal da empresa que representa;</p>
                    </li>
                    <li>
                      <p>Endereço de correio eletrónico da empresa que representa;</p>
                    </li>
                    <li>
                      <p>Nome da empresa que representa;</p>
                    </li>
                    <li>
                      <p>Morada ou moradas de entrega.</p>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    O primeiro e último nome será usado para efeitos de identificação do agente para
                    quando feita encomendas ao sistema.
                  </strong>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>
                      <p>A durabilidade deste dado será não mais que 7 anos para efeitos legais.</p>
                    </li>
                    <li>
                      <br></br>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    O número de identificação fiscal da empresa que o agente representa será usado para
                    feitos fiscais ao abrigo da Lei que regula a atividade fiscal:
                  </strong>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>
                      <p>Emissão de faturas;</p>
                    </li>
                    <li>
                      <p>Emissão de recibos;</p>
                    </li>
                    <li>
                      <p>
                        A durabilidade deste dado em sistema informático será não mais que 10 anos, salvo
                        se alterações às Leis no futuro o obriguem a alterar.
                      </p>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    Endereço de correio eletrónico da empresa será usado para contacto direto com o
                    agente para:
                  </strong>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>
                      <p>Atualizações do estado das encomendas;</p>
                    </li>
                    <li>
                      <p>Envio de faturas e/ou recibos;</p>
                    </li>
                    <li>
                      <p>Se o cliente concordar durante o registo, envio de campanhas comerciais.</p>
                      <ol style={{ listStyleType: 'lower-alpha' }}>
                        <li>
                          <p>
                            Nunca em circunstância alguma a empresa irá partilhar estas informações com
                            outra entidade salvo por força judicial.
                          </p>
                        </li>
                        <li>
                          <p>
                            O agente pode deixar de receber campanhas comerciais sempre que bem entender,
                            da mesma forma que consentiu, na Gestão de Encomendas.
                          </p>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    Nome da empresa que representa será usado para efeitos de faturação na emissão de
                    fatura:
                  </strong>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>
                      <p>
                        O campo “Nome” da pessoa, singular ou coletiva, a quem faturar tem que estar
                        preenchido com nome da empresa.
                      </p>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    A morada ou moradas será usado para efeitos de envio dos produtos que o agente
                    encomenda e processamento interno de estatística.
                  </strong>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>
                      <p>
                        A durabilidade deste dado não deverá de exceder dos 5 anos com o seguinte uso:
                      </p>
                      <ol style={{ listStyleType: 'lower-alpha' }}>
                        <li>
                          <p>
                            Proceder ao processamento estatístico de encomendas para planear e suportar
                            decisões estratégicas para o negócio da empresa.
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <p>
                        O agente pode aceitar ou não aceitar em qualquer momento o tratamento desde dado
                        para efeitos estatísticos de consumo interno da empresa.
                      </p>
                    </li>
                    <li>
                      <p>
                        O agente a qualquer momento pode pedir o direito ao esquecimento relativo a este
                        dado caso:
                      </p>
                      <ol style={{ listStyleType: 'lower-alpha' }}>
                        <li>
                          <p>Não existir encomendas pendentes para entrega.</p>
                        </li>
                        <li>
                          <p>
                            Não existir nenhum processo legal ou judicial pendente ou em progresso onde
                            este dado é relevante.
                          </p>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>
              <h2>Acesso a Gestão de Encomendas</h2>
              <ol style={{ listStyleType: 'lower-roman' }}>
                <li>
                  <strong>
                    Aquando de acesso ao serviço de gestão de encomendas o sistema irá registar a
                    seguinte informação em formato informático:
                  </strong>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>
                      <p>ID do agente (ID sendo o Identificador do agente no sistema informático).</p>
                    </li>
                    <li>
                      <p>Data e hora do acesso.</p>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    A permanência dos registos de acesso irão ser guardados tempo indefinido.
                  </strong>
                </li>
                <li>
                  <strong>
                    A identificação indireta da informação pessoal (entre ID e o Nome do agente) será
                    mantida apenas enquanto o nome do agente existir no sistema informático.
                  </strong>
                </li>
                <li>
                  <strong>
                    O direito ao esquecimento não é violado. A execução do direito ao esquecimento irá
                    destruir o nome do agente no sistema informático, tornando impossível a identificação
                    por via indireta.
                  </strong>
                </li>
              </ol>
            </li>
            <li>
              <br></br>
              <h2>Uso da Gestão de Encomendas</h2>
              <br></br>
              <ol style={{ listStyleType: 'lower-roman' }}>
                <li>
                  <strong>
                    Durante o uso do serviço de gestão de encomendas irá ser registado as seguintes
                    informações:
                  </strong>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>
                      <p>ID do agente (ID sendo o Identificador do agente no sistema informático).</p>
                    </li>
                    <li>
                      <p>Data e hora de criação de encomendas.</p>
                    </li>
                    <li>
                      <p>Referência da morada a enviar a encomenda, dado pelo agente.</p>
                    </li>
                    <li>
                      <p>
                        Endereço de correio eletrónico do agente para notificações do estado da
                        encomenda.
                      </p>
                    </li>
                    <li>
                      <p>Dados relativos aos produtos a encomendar (quantidades e produtos).</p>
                    </li>
                    <li>
                      <p>Caracter de urgência.</p>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    A durabilidade dos dados em sistema não será mais que 2 anos para efeitos legais
                    salvo:
                  </strong>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>
                      <p>Encomendas processadas e entregues e por liquidar.</p>
                    </li>
                    <li>
                      <p>Processos legais pendentes.</p>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    O uso destes dados durante 2 anos será para efeitos legais (Regime dos Bens em
                    Circulação):
                  </strong>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>
                      <p>Demonstração de resultados da empresa.</p>
                    </li>
                    <li>
                      <p>Contabilísticos.</p>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </Container>
    </MainLayout>
  );
}

export default Privacy;
