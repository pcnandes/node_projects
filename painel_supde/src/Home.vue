<template>
  <div>
    <q-tabs inverted no-pane-border v-model="activeTab">
      <q-tab slot="title" name="tab-1" icon="fa-info-circle" label="Informações" @select="onTabSelect"/>
      <q-tab slot="title" name="tab-2" icon="fa-clock-o" label="Última Carga" @select="onTabSelect"/>
      <q-tab slot="title" name="tab-3" icon="fa-star" label="Minhas Consultas" @select="onTabSelect"/>
      <q-tab slot="title" name="tab-4" icon="fa-share-alt" label="Consultas Compartilhadas" @select="onTabSelect"/>

      <q-tab-pane name="tab-1">
        <div class="row items-stretch xs-gutter">
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 column">
          <q-card style="flex:1">
            <q-card-title>
              <i class="fa fa-clock-o" aria-hidden="true"></i> Política de Atualização
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              Todos os dados são atualizados diariamente durante a noite, junto com a carga diária do DW Corporativo. Portanto as informações apresentadas nas consultas estarão atualizadas, no máximo, até D-1, exceto quando houver falha na carga do DW ou então indisponibilidade dos sistemas de origem no momento das coletas.
            </q-card-main>
          </q-card>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 column">
          <q-card style="flex:1">
            <q-card-title>
              <i class="fa fa-book" aria-hidden="true"></i> Tutoriais
            </q-card-title>
            <q-card-separator />
            <q-card-main>
            <ul>
              <li><a>Executar consulta</a></li>
              <li><a>Salvar e compartilhar consulta</a></li>
              <li><a>Filtros avançados</a></li>
              <li><a>Combinações de filtros</a></li>
              <li><a>Gráfico de pizza, rosca, barra, linha e área</a></li>
              <li><a>Gráfico de radar e polar</a></li>
              <li><a>Gráfico de dispersão</a></li>
              <li><a>Gráfico de calor</a></li>
              <li><a>Linha de tempo</a></li>
              <li><a>Construir dashboards</a></li>
              <li><a>Perfis de usuário</a></li>
            </ul>
            </q-card-main>
          </q-card>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 column">
          <q-card style="flex:1">
            <q-card-title>
              <i class="fa fa-podcast" aria-hidden="true"></i> Links Úteis
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              <ul>
              <li><a>Definições dos indicadores</a></li>
              <li><a>Sistemática de Apropriação</a></li>
              <li><a>AICAT - Configuração do Jenkis + ALM</a></li>
              <li><a>Portal ALM</a></li>
              <li><a>ALM</a></li>
              <li><a>DW Corporativo</a></li>
              <li><a>Relatórios SUPDE no DW Corporativo</a></li>
              </ul>
            </q-card-main>
          </q-card>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 column">
          <q-card style="flex:1">
            <q-card-title>
              <i class="fa fa-phone-square" aria-hidden="true"></i> Equipe de Suporte
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              <q-list no-border>
                <q-item>
                  <q-item-side icon="fa-user-circle" />
                  <q-item-main>
                    <q-item-tile label>Wilton Queiroz Araujo</q-item-tile>
                    <q-item-tile sublabel>wilton.araujo@serpro.gov.br</q-item-tile>
                    <q-item-tile sublabel>#21 7771</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-side icon="fa-user-circle" />
                  <q-item-main>
                    <q-item-tile label>Vitor Rodrigo Rosan</q-item-tile>
                    <q-item-tile sublabel>vitor.rosan@serpro.gov.br</q-item-tile>
                    <q-item-tile sublabel>#21 7778</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-side icon="fa-user-circle" />
                  <q-item-main>
                    <q-item-tile label>Paulo Cacador Fernandes</q-item-tile>
                    <q-item-tile sublabel>paulo.fernandes@serpro.gov.br</q-item-tile>
                    <q-item-tile sublabel>#21 7294</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-card-main>
          </q-card>
          </div>

          <div class="col-xs-12 column">
          <q-card style="flex:1">
            <q-card-title>
              <i class="fa fa-commenting" aria-hidden="true"></i> Novidades
            </q-card-title>
            <q-card-separator />
            <q-card-main>
            </q-card-main>
          </q-card>
          </div>
        </div>
      </q-tab-pane>
      <q-tab-pane name="tab-2" class="relative-position">
        Consultando última carga
      </q-tab-pane>
      <q-tab-pane name="tab-3" class="relative-position">
        Carregando consultas do usuário
      </q-tab-pane>
      <q-tab-pane name="tab-4" class="relative-position">
        Carregando consultas compartilhadas
      </q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
import { QTabs, QTab, QTabPane, QInnerLoading, QSpinner, QCard, QCardTitle, QCardMain, QCardSeparator, QList, QItem, QItemMain, QItemTile, QItemSide } from 'quasar'

export default {
  components: {
    QTabs,
    QTab,
    QTabPane,
    QInnerLoading,
    QSpinner,
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QList,
    QItem,
    QItemMain,
    QItemTile,
    QItemSide
  },
  methods: {
    onTabSelect (tab) {
      const number = tab.split('-')[1];
      const query = number === '1' ? undefined : { tab: number };
      this.$router.push({path: this.$route.path, query});
    }
  },
  data () {
    return {
      activeTab: 'tab-1'
    }
  },
  mounted () {
    if (this.$route.query && this.$route.query.tab) {
      this.activeTab = 'tab-' + this.$route.query.tab;
    }
  }
}
</script>

<style>
.q-tabs-head {
  padding: 0px !important; 
  font-size: .8em;
}
.q-tab, .q-tab.icon-and-label {
  padding: 1em;
  min-height: auto;
}
.q-tab .q-tab-icon {
  font-size: 1em;
  padding-right: .5em;
}
.q-tab {
  display: inline-block;
  min-height: auto;
}
.q-tabs-head {
  min-height: auto;
}
</style>