/**
 * 
 * @param name 用户名字符串类型
 * @param age 用户年龄，非必须
 */
const hello = (name: string, age?: number):string => {
    return `welcome ${name} : ${age}`;
}

export default hello;