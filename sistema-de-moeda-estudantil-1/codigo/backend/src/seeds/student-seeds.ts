import Student from '../models/student';

async function createDefaultStudents(): Promise<void> {
    const studentCount: number = await Student.count();

    if (studentCount === 0) {
        await Student.create({
            name: 'Matheus',
            email: 'matheus@email.com',
            password: 'senhamatheus',
            cpf: '11111111111',
            rg: '1010101010',
            address: 'minha casa'
        });

        await Student.create({
            name: 'João',
            email: 'joao@email.com',
            password: 'senhajoao',
            cpf: '22222222222',
            rg: '0101010101',
            address: 'minha casa 2'
        });

        console.log("Default companies created successfully");
    } else console.log("Default companies already exist");
}

export default createDefaultStudents;