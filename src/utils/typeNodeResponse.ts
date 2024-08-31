// export interface DataNodeResponse {
//    data: DataClass;
// }

// export interface DataClass {
//    object:           string;
//    results:          Result[];
//    next_cursor:      null;
//    has_more:         boolean;
//    type:             string;
//    page_or_database: PageOrDatabase;
//    request_id:       string;
// }

// export interface PageOrDatabase {
// }

export interface DataNodeResponse {
   object:           string;
   id:               string;
   created_time:     Date;
   last_edited_time: Date;
   created_by:       TedBy;
   last_edited_by:   TedBy;
   cover:            null;
   icon:             Icon;
   parent:           Parent;
   archived:         boolean;
   in_trash:         boolean;
   properties:       Properties;
   url:              string;
   public_url:       null;
}

interface TedBy {
   object: string;
   id:     string;
}

interface Icon {
   type:     string;
   external: External;
}

interface External {
   url: string;
}

interface Parent {
   type:        string;
   database_id: string;
}

interface Properties {
   // Regular:           Correct;
   Theme:              Theme;
   Date:             Fecha;
   // Incorrect:         Correct;
   Formula_respuesta: FormulaRespuesta;
   Respontracker:           Correct;
   Status:            Estado;
   Mostrar:           Mostrar;
   Answer:         Respuesta;
   Category:         Categoria;
   Question:            Nombre;
}

interface Categoria {
   id:     string;
   type:   string;
   select: {
      name: string;
      color: string;
   };
}

interface Theme {
   id:     string;
   type:   string;
   select: {
      name: string;
      color: string;
   };
}

interface Correct {
   id:     string;
   type:   string;
   number: null;
}

interface Estado {
   id:     string;
   type:   string;
   status: Status;
}

interface Status {
   id:    string;
   name:  string;
   color: string;
}

interface Fecha {
   id:   string;
   type: string;
   date: DateClass;
}

interface DateClass {
   start:     Date;
   end:       string;
   time_zone: string;
}

interface FormulaRespuesta {
   id:      string;
   type:    string;
   formula: Formula;
}

interface Formula {
   type:   string;
   string: string;
}

interface Mostrar {
   id:       string;
   type:     string;
   checkbox: boolean;
}

interface Nombre {
   id:    string;
   type:  string;
   title: Title[];
}

interface Title {
   type:        string;
   text:        Text;
   annotations: Annotations;
   plain_text:  string;
   href:        null | string;
}

interface Annotations {
   bold:          boolean;
   italic:        boolean;
   strikethrough: boolean;
   underline:     boolean;
   code:          boolean;
   color:         string;
}

interface Text {
   content: string;
   link: {url:string};
}

interface Respuesta {
   id:        string;
   type:      string;
   rich_text: Title[];
}
