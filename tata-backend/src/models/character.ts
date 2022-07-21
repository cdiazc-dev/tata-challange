export default class Character {
    id;
    nombre;
    altura;
    masa;
    color_pelo;
    color_piel;
    color_ojo;
    anio_nacimiento;
    genero;
    creado;
    editado;


    constructor(
        id,
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
        created) {
        
        this.id = id;
        this.nombre = name;
        this.altura = height;
        this.masa = mass;
        this.color_pelo = hair_color;
        this.color_piel = skin_color;
        this.color_ojo = eye_color;
        this.anio_nacimiento = birth_year;
        this.genero = gender;
        this.creado = created;
    }
}