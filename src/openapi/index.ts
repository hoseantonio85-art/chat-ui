/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BaseResponse {
	/** Признак успешности ответа */
	success: boolean;
	error?: ErrorMessage;
	messages?: Message[];
}

export interface Message {
	title?: string;
	text?: string;
	type?: string;
	code?: string;
	uuid?: string;
}

export interface ErrorMessage {
	/** Уникальный идентификатор ошибки */
	uuid?: string;
	/** Код ошибки в соответствии с требованиями. Переданный код ошибки влияет на формат отображения ошибки на фронте. */
	code?: string;
	/** Заголовок в соответствии с кодом ошибки. */
	title?: string;
	/** Текст в соответствии с кодом ошибки */
	text?: string;
	/** Заполняется в случае, если произошла ошибка при работе метода. Для обрабатываемых ошибок не заполняется. */
	exception?: string;
}

export type GetEmployeeInfoResponse = BaseResponse & {
	body?: EmployeeInfoBody;
};

export interface EmployeeInfoBody {
	userInfo?: EmployeeUserInfo;
	permissions?: string[];
	roles?: string[];
}

export type EmployeeUserInfo = EmployeeInfo & {
	/** Внутренний идентификатор сотрудника в Сбер ОРМ */
	userId?: string;
	/** Тип сотрудника РК или РМ */
	userType?: string;
};

/** Сведения о сотруднике */
export interface EmployeeInfo {
	/** Внутренний табельный номер сотрудника */
	personalNumber?: string;
	/** Имя */
	firstName?: string;
	/** Отчество */
	middleName?: string;
	/** Фамилия */
	lastName?: string;
	/** Должность */
	position?: string;
	/** Элемент справочника */
	tenant?: DictionaryItem;
}

export type LoginResponse = BaseResponse & {
	body?: LoginBody;
};

export interface LoginBody {
	needChooseTenant?: boolean;
}

export interface CreateMethodologistDocumentRequest {
	/** Идентификатор файла (guid) */
	fileId?: string;
	/**
	 * Файл, добавленный пользователем
	 * @format binary
	 */
	file?: File;
}

export type CreateMethodologistDocumentResponse = BaseResponse & {
	body?: CreateMethodologistDocumentResponseBody;
};

export type ListMethodologistDocumentsResponse = BaseResponse & {
	body?: ListMethodologistDocumentsResponseBody;
};

/** Элемент справочника */
export interface DictionaryItem {
	/** ид записи */
	id: string;
	/** текст, значение записи */
	value: string;
}

export type GetTenantsResponse = BaseResponse & {
	body?: Tenants;
};

export interface Tenants {
	items?: DictionaryItem[];
}

export type GetLinearResponse = BaseResponse & {
	body?: LinearDict;
};

export interface LinearDict {
	result?: DictionaryItem[];
}

export interface UpdateIncidentRequest {
	body?: UpdateIncidentRequestBody;
}

export type IncidentViewResponse = BaseResponse & {
	/** Инцидент(ТФ), данные справочников, конфигурация формы и данные пользователей */
	body?: IncidentViewResponseBody;
};

export type RefreshIncidentResponse = BaseResponse & {
	/** Инцидент(ТФ), данные справочников, конфигурация формы и данные пользователей */
	body?: IncidentViewResponseBody;
};

export type SearchIncidentsResponse = BaseResponse & {
	body?: SearchIncidentsResponseBody;
};

export type SearchMeasuresResponse = BaseResponse & {
	body?: CloudSearchMeasuresResponseBody;
};

export type GetQuickFiltersResponse = BaseResponse & {
	body?: GetQuickFiltersResponseBody;
};

export type MeasureGetQuickFiltersResponse = BaseResponse & {
	body?: CloudGetQuickFiltersResponseBody;
};

export type GetFiltersRequest = Record<string, ObjectField>;

export type GetFiltersResponse = BaseResponse & {
	body?: GetFiltersResponseBody;
};

export type GetMeasureFiltersResponse = BaseResponse & {
	body?: GetFiltersResponseBody1;
};

export interface DictStructureRequest {
	/** Идентификатор справочника */
	dictId: string;
	/** Элемент структуры для которого нужно вернуть уровни */
	itemId?: string;
	addParams?: Record<string, string>;
}

export type BaseDictStructureResponse = BaseResponse & {
	levels?: ClassifierLevel[];
};

export interface ClassifierLevel {
	selectedId?: string;
	items?: Item[];
}

export interface Item {
	id?: string;
	name?: string;
	leaf?: boolean;
}

export type GetTasksResponse = BaseResponse & {
	body?: GetTasksResponseBody;
};

export type GetLimitLossesResponse = BaseResponse & {
	body?: GetLimitLossesResponseBody;
};

export type GetChangeHistoryResponse = BaseResponse & {
	body?: ChangeHistoryResponseBody;
};

export type LinkUpdateResponse = BaseResponse & {
	body?: LinkUpdateResponseBody;
};

export type LinkSearchResponse = BaseResponse & {
	body?: LinkSearchResponseBody;
};

export type AttachmentS3UploadResponse = BaseResponse & {
	body?: AttachmentS3UploadBody;
};

export interface DeleteAttachmentsRequest {
	fileIds?: string[];
}

export type MeasureViewResponse = BaseResponse & {
	/** Мера(ТФ), данные справочников, конфигурация формы и данные пользователей */
	body?: CloudMeasureViewResponseBody;
};

export interface UpdateMeasureRequest {
	body?: CloudUpdateMeasureRequestBody;
}

export type RefreshMeasureResponse = BaseResponse & {
	/** Мера(ТФ), данные справочников, конфигурация формы и данные пользователей */
	body?: CloudMeasureViewResponseBody;
};

export type GetMeasureTasksResponse = BaseResponse & {
	body?: CloudGetTasksResponseBody;
};

export interface MeasureWorkflowActionRequest {
	id?: string;
	edit?: boolean;
	action?: string;
	comment?: string;
	version?: number;
	/** @example {"orgId":"SBR_10000203"} */
	parameters?: Record<string, string>;
}

export type MeasureGetChangeHistoryResponse = BaseResponse & {
	body?: CloudMeasureChangeHistoryResponseBody;
};

export interface SearchLinkTypeRequest {
	query?: string;
}

export type SearchLinkTypeResponse = BaseResponse & {
	count?: number;
	notifications?: Notification[];
	objects?: FormComponent[];
};

export interface WorkflowActionBody {
	/** бизнес-идентификатор сущности, по которой производится действие */
	id?: string;
	/** признак запроса на полный ответ сервера для редактирования */
	edit?: boolean;
	/** action бизнес-процесс */
	action?: string;
	/** текущая версия сущности */
	version?: number;
	/** комментарий шага бизнес-процесса */
	comment?: string;
	/** @example {"orgId":"SBR_10000203"} */
	parameters?: Record<string, string>;
}

export interface SearchIncidentsRequestBody {
	section?: string;
	filter?: SearchIncidentsRequestBodyFilter;
}

export interface ValueFilter {
	field?: string;
	value?: string[];
}

export interface DateFilter {
	field?: string;
	/** @format date-time */
	dateFrom?: string;
	/** @format date-time */
	dateTo?: string;
}

export interface AmountFilter {
	field?: string;
	amountFrom?: number;
	amountTo?: number;
}

export interface RefreshIncidentRequestBody {
	editableView?: boolean;
	incident?: BusinessObject;
}

export interface ListSkillsResponse {
	skills?: SkillPageInfo[];
	error?: Error;
}

export interface SkillPageInfo {
	id?: string;
	title?: string;
	type?: string;
	active?: boolean;
	extras?: string | number | boolean | Array<string | number | boolean>;
}

export interface Error {
	uuid?: string;
	exception?: string;
	code?: string;
	title?: string;
	text?: string;
}

export interface GetIncidentByIdResponse {
	incident?: BusinessObject;
	error?: Error;
}

export interface LinkUpdateRequestBody {
	linkedIds?: string[];
}

export interface LinkSearchRequestBody {
	/** Строка поиска (поиск по неполному ид меры) */
	query?: string;
}

export interface CloudSearchMeasuresRequestBody {
	section?: string;
	filter?: SearchIncidentsRequestBodyFilter;
}

export interface CloudRefreshMeasureRequestBody {
	editableView?: boolean;
	measure?: BusinessObject;
	links?: LinkTypeData[];
}

export interface LinkTypeData {
	/**
	 * Тип связи
	 * @example "incidentToMeasure"
	 */
	linkType?: string;
	/**
	 * наименование связи
	 * @example "связь с инцидентом"
	 */
	title?: string;
	/**
	 * Версия аггрегата связи
	 * @example 1
	 */
	version?: number;
	value?: string[];
}

export interface CreateMethodologistDocumentResponseBody {
	/** блок с уведомлениями, которые необходимо отображать на фронте */
	notifications?: Notification[];
}

export interface ListMethodologistDocumentsResponseBody {
	/** список документов пользователя */
	userDocuments?: FormComponent[];
	/** блок с уведомлениями, которые необходимо отображать на фронте */
	viewMessages?: Notification[];
}

export interface UpdateIncidentRequestBody {
	editableView?: boolean;
	incident?: BusinessObject;
}

/** Инцидент(ТФ), данные справочников, конфигурация формы и данные пользователей */
export type IncidentViewResponseBody = FormBody & {
	data?: IncidentViewResponseBodyData;
	/** Настройки правил отображения формы. Видимость полей, настройки дочерних сущностей. */
	config?: IncidentViewConfig;
	/** ЮЛ, кого упоминали */
	orgs?: EpkOrganization[];
	/** ФЛ, с которым произошел инцидент */
	individuals?: EpkIndividual[];
};

/** Настройки правил отображения формы. Видимость полей, настройки дочерних сущностей. */
export type IncidentViewConfig = ViewConfig & {
	/** Форма инцидента */
	form?: IncidentForm;
	templates?: Record<string, BusinessObject[]>;
};

/** Форма инцидента */
export interface IncidentForm {
	/** Компонент формы */
	incident?: FormComponent;
	links?: LinkComponent[];
}

export type SearchIncidentsResponseBody = FormBody & {
	total?: number;
	incidents?: FormComponent[];
};

export type CloudSearchMeasuresResponseBody = FormBody & {
	total?: number;
	measures?: FormComponent[];
};

export interface GetQuickFiltersResponseBody {
	field?: string;
	type?: string;
	format?: string;
	filters?: QuickFilter[];
}

export interface QuickFilter {
	id?: string;
	name?: string;
	count?: string;
}

export interface CloudGetQuickFiltersResponseBody {
	field?: string;
	type?: string;
	format?: string;
	filters?: QuickFilter[];
}

export interface ObjectField {
	/**
	 * oneOf: string, number (int32, float), boolean, array of strings Возможные варианты значений:
	 *   1. (Простые типы, строка) значение поля
	 *   2. (Массив строк) значения ValueObject
	 */
	value?: string | number | boolean | Array<string | number | boolean>;
}

export interface GetFiltersResponseBody {
	data?: Record<string, ObjectField>;
	/** Настройки правил отображения формы. Видимость полей, настройки дочерних сущностей. */
	config?: IncidentViewConfig;
	structure?: FilterStructureItem[];
}

export interface FilterStructureItem {
	name?: string;
	title?: string;
	fields?: string[];
}

export interface GetFiltersResponseBody1 {
	data?: Record<string, ObjectField>;
	/** Настройки правил отображения формы. Видимость полей, настройки дочерних сущностей. */
	config?: MeasureViewConfig;
	structure?: FilterStructureItem[];
}

export interface GetTasksResponseBody {
	title?: string;
	blocks?: TaskBlock[];
}

export interface TaskBlock {
	title?: string;
	description?: string;
	value?: number;
	type?: string;
	section?: string;
	quickFilters?: string[];
}

export interface GetLimitLossesResponseBody {
	title?: string;
	losses?: LimitLoss[];
}

export interface LimitLoss {
	limitLossType?: string;
	title?: string;
	/** @format int64 */
	loss?: number;
	/** @format int64 */
	limit?: number;
	/** @format int64 */
	lossDiff?: number;
	/** @format date-time */
	createTime?: string;
}

export interface ChangeHistoryResponseBody {
	/** Массив элементов с информацией о переходах инцидента по статусам */
	changes?: ChangeHistoryItem[];
	/** блок данных о пользователях, которые упоминаются в каких либо полях объекта */
	employees?: Record<string, Employee>;
}

export interface ChangeHistoryItem {
	/** Элемент справочника */
	status?: DictionaryItem;
	/** Элемент справочника */
	action?: DictionaryItem;
	/** @format date-time */
	date?: string;
	/** Пользователь, который вносил изменения */
	user?: string;
	/** Поле формы */
	comment?: FormField;
	fieldChanges?: ChangeHistoryFieldChanges;
}

export interface ChangeHistoryFieldChanges {
	title?: string;
	incident?: ChangeComponent;
}

export interface LinkUpdateResponseBody {
	notifications?: Notification[];
}

export interface LinkSearchResponseBody {
	notifications?: Notification[];
	/** Кол-во найденных мер по заданным условиям поиска */
	count?: number;
	/** Массив мер */
	measures?: FormComponent[];
}

export interface AttachmentS3UploadBody {
	notifications?: Notification[];
}

/** Мера(ТФ), данные справочников, конфигурация формы и данные пользователей */
export type CloudMeasureViewResponseBody = FormBody & {
	data?: CloudMeasureViewResponseBodyData;
	/** Настройки правил отображения формы. Видимость полей, настройки дочерних сущностей. */
	viewConfig?: MeasureViewConfig;
	/** Настройки правил отображения формы. Видимость полей, настройки дочерних сущностей. */
	view?: MeasureViewConfig;
};

export interface CloudUpdateMeasureRequestBody {
	editableView?: boolean;
	measure?: BusinessObject;
	links?: LinkTypeData[];
}

export interface CloudGetTasksResponseBody {
	title?: string;
	blocks?: TaskBlock[];
}

export interface CloudMeasureChangeHistoryResponseBody {
	/** Массив элементов с информацией о переходах меры по статусам */
	changes?: CloudMeasureChangeHistoryItem[];
	/** блок данных о пользователях, которые упоминаются в каких либо полях объекта */
	employees?: Record<string, Employee>;
}

export interface CloudMeasureChangeHistoryItem {
	/** Элемент справочника */
	uiStatus?: DictionaryItem;
	/** Элемент справочника */
	action?: DictionaryItem;
	/** @format date-time */
	date?: string;
	/** Пользователь, который вносил изменения */
	user?: string;
	/** Поле формы */
	comment?: FormField;
	fieldChanges?: CloudMeasureChangeHistoryFieldChanges;
}

export interface CloudMeasureChangeHistoryFieldChanges {
	title?: string;
	measure?: ChangeComponent;
	links?: Record<string, CloudMeasureChangeHistoryLinksChanges>;
}

export interface CloudMeasureChangeHistoryLinksChanges {
	title?: string;
	actionType?: string;
	objects?: ChangeComponent[];
}

/** Сведения об общих требованиях валидации при переходе по флоу */
export interface Notification {
	/**
	 * Тип ошибки. Используется для отображения ошибки на фронте. Возможные значения:
	 *   - error - ошибка обработки данных
	 *   - warning
	 *   - info
	 *   - success - уведомление об успешном выполнении действия.
	 */
	notificationType?: string;
	/** Код ошибки. В зависимости от переданного кода ошибки на фронте могут быть выполнены дополнительные действия (например, перезапрашиваются данные с новыми параметрами). Необязательное поле */
	code?: string;
	/** Заголовок ошибки */
	title?: string;
	/** Текст ошибки */
	text?: string;
	/** действия (кнопки) */
	actions?: Action[];
	/** Параметр, содержащий действие пользователя по воркфлоу, которое привело к ошибкам валидации при попытке перевода по воркфлоу. */
	validateOnAction?: string;
}

/** Действие */
export interface Action {
	/** Текст действия */
	title?: string;
	/** Тип действия. Внешняя (external) или подсказка-дровер (hint) */
	type?: string;
	/** Адрес ссылки. Если ссылка внешняя, то полная ссылка. Если дровер, то часть ссылки */
	link?: string;
}

/** Компонент формы */
export interface FormComponent {
	/** Идентификатор для связи компонента с бизнес-объектом */
	id?: string;
	/** Поля компонента формы */
	fields?: Record<string, FormField>;
	/** Дочерние сущности объекта */
	dependents?: Record<string, FormComponent[]>;
}

/** Поле формы */
export type FormField = CommonField & {
	/** Список доступных для выбора справочных значений поля с зависимыми полями */
	availableItems?: FormDictionaryItem[];
};

export interface CommonField {
	/** Локализованное название поля. Может отсутствовать если для поля не требуется отображать название */
	title?: string;
	/** Передается только для редактирования. Дефолтное значение атрибута = true. */
	visible?: boolean;
	/** Тип поля, необходимый фронту, чтобы считать данные. Должно быть заполнено всегда */
	type?: string;
	/** Маркер возможности редактировать поле. Значение по умолчанию false не передается */
	editable?: boolean;
	/** Маркер обязательности поля. Зависит от статуса ИОР. Значение по умолчанию false не передается */
	required?: boolean;
	/** Элемент справочника */
	path?: DictionaryItemPath;
	/**
	 * Упорядоченная последовательность элементов классификатора от корневого значения к конечному листу
	 * @example "Территориальные банки › Северо-Западный банк › Аппарат банка › Головные отделения › Головное отделение по Санкт-Петербургу › Аппарат отделения › Управление прямых продаж"
	 */
	pathItems?: DictionaryItem[];
	/**
	 * oneOf: string, integer, number, boolean, array Возможные варианты значений:
	 *   1. (Простые типы) значение поля - для view значение из ТФ или расчетное, для edit только расчетное
	 *   2. (Строка или массив строк) идентификаторы выбранных элементов из списка availableItems
	 *   3. (Строка) идентификатор конечного элемента пути из списка path
	 */
	value?: string | number | boolean | Array<string | number | boolean>;
	/** Правила валидации данных при сохранении объекта или при движении по воркфлоу (доступные правила валидации). */
	validation?: CommonFieldValidation[];
	/**
	 * Локализованная ошибка валидации поля. Оставлено для совместимости c ПАО. В клауде нужно использовать extras
	 * @deprecated
	 */
	validationError?: string;
	/** дополнительные атрибуты поля могут содержать произвольные значения, в т.ч. напрямую транслируемые из блока конфигурации ui известные аттрибуты: dictionary, format, description, hint, refresh, calculated, validationError */
	extras?: Record<
		string,
		string | number | boolean | Array<string | number | boolean>
	>;
}

/**
 * Элемент справочника
 * @deprecated
 * @example "Территориальные банки › Северо-Западный банк › Аппарат банка › Головные отделения › Головное отделение по Санкт-Петербургу › Аппарат отделения › Управление прямых продаж"
 */
export interface DictionaryItemPath {
	/** Путь снизу вверх, начиная с основного элемента */
	items?: DictionaryItem[];
}

/** Элемент справочника с зависимыми полями */
export type FormDictionaryItem = DictionaryItem & {
	/** зависимые поля, которые видны при выборе этого элемента справочника */
	dependentFields?: Record<string, DependentField>;
};

/** Зависимое поле формы */
export type DependentField = CommonField & {
	/** Список доступных для выбора справочных значений поля */
	availableItems?: DictionaryItem[];
};

export interface BusinessObject {
	/**
	 * Внутренний идентификатор объекта
	 * @example "7177277595696365573"
	 */
	id?: string;
	/** Поля объекта */
	fields?: Record<string, ObjectField>;
	/** Дочерние сущности объекта */
	dependents?: Record<string, BusinessObject[]>;
}

/** Настройки правил отображения формы */
export interface FormBody {
	/** Данные о пользователях для отображения */
	users?: Users;
	/** блок данных о пользователях, которые упоминаются в каких либо полях объекта */
	employees?: Record<string, Employee>;
	/** блок с уведомлениями, которые необходимо отображать на фронте */
	notifications?: Notification[];
}

/**
 * Данные о пользователях для отображения
 * @deprecated
 */
export interface Users {
	/** id пользователя -> сведения о пользователе */
	items?: Record<string, UserInfo>;
}

/**
 * Элемент справочника с зависимыми полями
 * @deprecated
 */
export type UserInfo = Employee & {
	/** Структура */
	orgStructure?: string;
};

/** Сведения о пользователе */
export interface Employee {
	/** Имя */
	firstName?: string;
	/** Отчество */
	middleName?: string;
	/** Фамилия */
	lastName?: string;
	/** Должность */
	position?: string;
	/** Табельный номер */
	personalNumber?: string;
	/** Признак увольнения */
	fired?: boolean;
}

/** ЮЛ, кого упоминали */
export interface EpkOrganization {
	/** идентификатор */
	clientId?: string;
	/** наименование полное */
	fullName?: string;
	/** наименование короткое */
	shortName?: string;
	/** инн */
	inn?: string;
	/** кпп */
	kpp?: string;
	/** огрн */
	ogrn?: string;
	/** сегмент */
	segment?: string;
	/** Принадлежность к списку БИТЛ */
	isInsider?: boolean;
}

/** ФЛ, с которым произошел реестр */
export interface EpkIndividual {
	/** идентификатор */
	clientId?: string;
	/** полное имя клиента ФЛ */
	fullName?: ClientName;
	/**
	 * дата рождения
	 * @format date
	 */
	birthDate?: string;
	/**
	 * дата смерти
	 * @format date
	 */
	deathDate?: string;
	/** признак инсайдера */
	insider?: boolean;
	/** сегмент */
	segment?: string;
	/** дееспособность */
	legalCapacity?: string;
	/** категория пенсионера */
	pensionerCategory?: string;
	/** канал обслуживания */
	serviceChannel?: string;
	/** стадия банкротства */
	bankruptStage?: string;
	/**
	 * типы стоп-листа
	 * @example ["Стоп-лист Комплаенс","Признак 345-О"]
	 */
	stopLists?: string[];
}

/** полное имя клиента ФЛ */
export interface ClientName {
	/** имя */
	firstName?: string;
	/** фамилия */
	lastName?: string;
	/** отчество */
	middleName?: string;
}

/** Настройки правил отображения формы. Видимость полей, настройки дочерних сущностей. */
export interface ViewConfig {
	/** Список вложений */
	attachments?: Attachment[];
	/** Список доступных действий по процессу */
	workflowActions?: WorkflowAction[];
	/** История переходов объекта по бизнес-процессу */
	workflowHistory?: WorkflowHistoryItem[];
	/** уведомления, которые необходимо отобразить в интерфейсе как часть формы объекта */
	viewMessage?: Notification[];
	/** возможность редактирования формы в текущем состоянии воркфлоу для текущего пользователя */
	editable?: boolean;
	/** текущая версия объекта */
	version?: number;
}

/** Действие по процессу */
export interface WorkflowAction {
	/**
	 * Ид действия
	 * @example "["approve","decline","delete"]"
	 */
	id?: string;
	/**
	 * Название действия
	 * @example "["sendForInvestigation","approve","delete"]"
	 */
	name?: string;
	/**
	 * Название действия для отображения названия кнопки
	 * @example "["Переоценить","Подтвердить","На подтверждение"]"
	 */
	title?: string;
	/** Параметры, необходимые для отображения действия на фронте */
	params?: Record<
		string,
		string | number | boolean | Array<string | number | boolean>
	>;
}

/** История движения анкеты риска по бизнес-процессу */
export interface WorkflowHistoryItem {
	/** Внутренний идентификатор сотрудника в ОРМ */
	userId?: string;
	/** Элемент справочника */
	task?: DictionaryItem;
	/** Элемент справочника */
	action?: DictionaryItem;
	/**
	 * Время операции
	 * @format date-time
	 */
	timeChanged?: string;
	/** Комментарий */
	comment?: string;
}

export interface LinkComponent {
	/** id связи */
	linkType?: string;
	linkedObjects?: FormComponent[];
}

/** Настройки правил отображения формы. Видимость полей, настройки дочерних сущностей. */
export type MeasureViewConfig = ViewConfig & {
	/** Форма мер */
	form?: MeasureForm;
	/** Путь */
	departments?: OrgStructure;
};

/** Форма мер */
export interface MeasureForm {
	/** Компонент формы */
	measure?: FormComponent;
	efficiencyForecast?: Table;
	efficiencyFact?: Table;
	links?: LinkTypeFormComponent[];
}

/** компонент для отображения одного типа связи с дополнительными полями */
export interface LinkTypeFormComponent {
	linkType?: string;
	title?: string;
	linkedObjects?: FormComponent[];
}

/** Путь */
export interface OrgStructure {
	/** id орг структуры -> путь */
	items?: Record<string, DictionaryItemPath>;
}

export interface ChangeComponent {
	/** Возможные значения: added - Добавлено, edited - Изменено, deleted - Удалено */
	actionType?: string;
	title?: string;
	fields?: Record<string, ChangeField>;
	dependents?: Record<string, ChangeComponent[]>;
}

export type ChangeField = FormField & {
	/** Поле формы */
	old?: FormField;
};

/** Информация о файле */
export interface Attachment {
	/** Идентификатор файла из ЕСМ */
	fileId: string;
	/** Название файла */
	filename: string;
	/**
	 * Размер загруженного файла в байтах
	 * @format int64
	 * @example 14939
	 */
	size: number;
	/**
	 * Расширение загруженного файла
	 * @example "xlsx"
	 */
	extension: string;
	/**
	 * Внутренний идентификатор пользователя, выполнившего запрос
	 * @example "7172071357486006273"
	 */
	author?: string;
	/**
	 * Текущие дата и время в UTC+0
	 * @format date-time
	 * @example {}
	 */
	createTime?: string;
}

export interface Table {
	/** Заголовки столбцов таблицы */
	header?: Record<string, Header>;
	/** Список строк таблицы */
	rows?: Row[];
	/** Список агрегированных данных по каждому столбцу */
	summary?: Record<string, Summary>;
	/** Справочники для фильтрации данных в таблице */
	filters?: Record<string, Dictionary>;
}

export interface Header {
	/** Локализованный текст заголовка */
	title?: string;
}

export interface Row {
	/** Ячейки строки */
	cells?: Record<string, Cell>;
}

/** Ячейка таблицы */
export interface Cell {
	/**
	 * oneOf: string, integer, number, boolean, array Возможные варианты значений:
	 *   1. (Простые типы) значение поля - для view значение из ТФ или расчетное, для edit только расчетное
	 *   2. (Строка или массив строк) идентификаторы выбранных элементов из списка availableItems
	 *   3. (Строка) идентификатор конечного элемента пути из списка path
	 */
	value?: string | number | boolean | Array<string | number | boolean>;
	/** Список доступных для выбора справочных значений поля */
	availableItems?: DictionaryItem[];
	/** Признак возможности редактирования ячейки */
	editable?: boolean;
}

export interface Summary {
	/** oneOf: string, integer, number, boolean, array */
	value?: string | number | boolean | Array<string | number | boolean>;
}

/** Список доступных для выбора справочных значений поля */
export interface Dictionary {
	/** Локализованное название справочника */
	title?: string;
	items?: DictionaryItem[];
}

export interface DictionaryUploadBody {
	/** @format binary */
	file?: File;
}

export interface CompaniesUploadBody {
	/** @format binary */
	file?: File;
}

export interface RisksUploadBody {
	/** @format binary */
	file?: File;
}

export interface V1TenantsBody {
	/** Элемент справочника */
	tenant?: DictionaryItem;
}

export interface AttachmentFileIdBody {
	/** @format binary */
	file?: File;
}

export interface SearchIncidentsRequestBodyFilter {
	query?: string;
	dictionarySearch?: ValueFilter[];
	dates?: DateFilter[];
	amounts?: AmountFilter[];
}

export interface IncidentViewResponseBodyData {
	incident?: BusinessObject;
}

export interface CloudMeasureViewResponseBodyData {
	measure?: BusinessObject;
	links?: LinkTypeData[];
}

export interface CommonFieldValidation {
	/** Техническое название правила, по которому происходит валидация */
	type?: string;
	/** oneOf: string, integer, number, boolean Параметр правила валидации, тип данных определяется типом правила валидации */
	condition?: string | number | boolean | Array<string | number | boolean>;
	/** Локализованное описание правила валидации, для отображения в интерфейсе */
	text?: string;
}

export interface GetIncidentParams {
	/** @default false */
	edit?: boolean;
	/** @pattern ^[a-zA-Z]+$ */
	validateOnAction?: string;
	/** @pattern ^[a-zA-Z0-9_-]+$ */
	id: string;
}

export interface GetLinearDictParams {
	/**
	 * Идентификатор справочника
	 * @pattern ^[a-zA-Z]+$
	 */
	dictId: string;
	/**
	 * Наименование бизнес сущности
	 * @pattern ^[a-zA-Z]+$
	 */
	entityName: string;
}

export interface GetQuickFiltersParams {
	/** @pattern ^[a-zA-Z0-9_]+$ */
	section: string;
}

export interface GetSkillsParams {
	/** @pattern ^[a-zA-Z]+$ */
	page: string;
}

export interface GetQuickFiltersMeasureParams {
	/** @pattern ^[a-zA-Z0-9_]+$ */
	section: string;
}

export interface GetMeasureParams {
	/** @default false */
	edit?: boolean;
	validateOnAction?: string;
	/** @pattern ^[a-zA-Z0-9_-]+$ */
	id: string;
}
