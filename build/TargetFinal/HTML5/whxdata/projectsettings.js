// Publish project specific data
(function() {
rh = window.rh;
model = rh.model;
var defaultTopic = "First_Topic.htm";
rh._.exports(defaultTopic);
rh.consts('DEFAULT_TOPIC', encodeURI("First_Topic.htm"));
rh.consts('HOME_FILEPATH', encodeURI('index.htm'));
rh.consts('START_FILEPATH', encodeURI('index.htm'));
rh.consts('HELP_ID', 'e92d6f34-48ab-47e8-b8db-f11c7d00d82d' || 'preview');
rh.consts('LNG_SUBSTR_SEARCH', 0);

model.publish(rh.consts('KEY_LNG_NAME'), "pt");
model.publish(rh.consts('KEY_DIR'), "ltr");
model.publish(rh.consts('KEY_LNG'), {"Contents":"Conteúdo","Index":"Índice","Search":"Pesquisar","Glossary":"Glossário","Logo/Author":"Powered By","Show":"Mostrar","Hide":"Ocultar","SyncToc":"TocSincronização","Prev":"Anterior","Next":"Próximo","Disabled Prev":"<<","Disabled Next":">>","Separator":"|","OpenLinkInNewTab":"Abrir em nova aba","SearchOptions":"Opções de pesquisa","Loading":"Carregando...","UnknownError":"Erro desconhecido","Logo":"Logotipo","HomeButton":"Início","SearchPageTitle":"Resultados da pesquisa","PreviousLabel":"Anterior","NextLabel":"Próximo","TopicsNotFound":"Nenhum resultado encontrado","JS_alert_LoadXmlFailed":"Falha ao carregar arquivo XML","JS_alert_InitDatabaseFailed":"Falha ao inicializar banco de dados","JS_alert_InvalidExpression_1":"A cadeia de pesquisa digitada não é válida.","Searching":"Pesquisando...","Cancel":"Cancelar","Canceled":"Cancelado","ResultsFoundText":"%1 resultado(s) encontrado(s) para %2","SearchResultsPerScreen":"Resultados de pesquisa por página","Back":"Voltar","TableOfContents":"Índice","IndexFilterKewords":"Filtrar palavras-chave","GlossaryFilterTerms":"Filtrar termos","ShowAll":"Tudo","HideAll":"Ocultar tudo","ShowHide":"Exibir/Ocultar","IeCompatibilityErrorMsg":"Esta página não pode ser visualizada no Internet Explorer 8 ou versão mais recente.","NoScriptErrorMsg":"Habilite o suporte ao JavaScript no seu navegador para visualizar esta página.","EnableAndSearch":"Incluir todas as palavras na pesquisa","HighlightSearchResults":"Destacar resultados da pesquisa","Expand/Collapse All":"Expandir/Recolher tudo","Remove Highlight":"Remover destaque","Print":"Imprimir","Filter":"Filtrar","SearchTitle":"Pesquisar","ContentFilterChanged":"O filtro de conteúdos foi alterado. Pesquise novamente","EndOfResults":"Fim dos resultados da pesquisa.","Reset":"Reiniciar","NavTip":"Fechar","ToTopTip":"Ir para o início","ApplyTip":"Aplicar","SidebarToggleTip":"Expandir/Recolher","Copyright":"© Copyright 2019. All rights reserved.","FavoriteBoxTitle":"Favoritos","setAsFavorites":"Adicionar a Favoritos","unsetAsFavorite":"Remover de Favoritos","favoritesNameLabel":"Nome","favoritesLabel":"Favoritos","setAsFavorite":"Definir como favorito","nofavoritesFound":"Você não marcou nenhum tópico como favorito.","Welcome_header":"Bem-vindo à nossa Central de Ajuda","Welcome_text":"Em que podemos ajudá-lo?","SearchButtonTitle":"Pesquisar...","ShowTopicInContext":"Clique aqui para ver esta página com o contexto completo","TopicHiddenText":"Este tópico tem os filtros selecionados aplicados.","NoTermsFound":"Nenhum termo encontrado","NoKeywordFound":"Nenhuma palavra-chave encontrada","SkipToMainContent":"Ir para o conteúdo principal","SearchPaginationLabel":"%1 a %2 de %3 resultados","NextSearchResults":"Próxima página de pesquisa","PrevSearchResults":"Página de pesquisa anterior"});

model.publish(rh.consts('KEY_HEADER_TITLE'), "TargetFinal");
model.publish(rh.consts('PDF_FILE_NAME'), "");
model.publish(rh.consts('MAX_SEARCH_RESULTS'), "20");
model.publish(rh.consts('KEY_SKIN_FOLDER_NAME'), "single_page");
model.publish(rh.consts('CHAT_API_SESSION_TOKEN'), "");
model.publish(rh.consts('CHAT_API_PROJ_ID'), "");

model.publish(rh.consts('KEY_SUBSTR_SEARCH'), "");
model.publish(rh.consts('KEY_LOGO_URL'), "");
model.publish(rh.consts('KEY_SPECIAL_CHARS'), "0;1;2;3;4;5;6;7;8;9");
})();
