import Professor from '../models/professor';

const professoresData = [
    { name: 'João Paulo Aramuni', email: 'joao.aramuni@example.com', password: 'password123', cpf: '11122233301', departamento: 'Ciência da Computação', idInstituicaoEnsino: 1 },
    { name: 'Maria Oliveira', email: 'maria.oliveira@example.com', password: 'password123', cpf: '22233344402', departamento: 'Engenharia de Software', idInstituicaoEnsino: 1 },
    { name: 'Beatriz Costa', email: 'beatriz.costa@example.com', password: 'password123', cpf: '55566677703', departamento: 'Engenharia de Computação', idInstituicaoEnsino: 1 },
    { name: 'Lucas Mendes', email: 'lucas.mendes@example.com', password: 'password123', cpf: '66677788804', departamento: 'Jogos Digitais', idInstituicaoEnsino: 1 },
    { name: 'Carlos Alberto', email: 'carlos.alberto@example.com', password: 'password123', cpf: '33344455505', departamento: 'Sistemas de Informação', idInstituicaoEnsino: 2 },
    { name: 'Fernanda Lima', email: 'fernanda.lima@example.com', password: 'password123', cpf: '77788899906', departamento: 'Ciência da Computação', idInstituicaoEnsino: 2 },
    { name: 'Ricardo Alves', email: 'ricardo.alves@example.com', password: 'password123', cpf: '88899900007', departamento: 'Matemática Computacional', idInstituicaoEnsino: 2 },
    { name: 'Ana Souza', email: 'ana.souza@example.com', password: 'password123', cpf: '44455566608', departamento: 'Ciência de Dados', idInstituicaoEnsino: 3 },
    { name: 'Pedro Martins', email: 'pedro.martins@example.com', password: 'password123', cpf: '99900011109', departamento: 'Administração', idInstituicaoEnsino: 3 },
    { name: 'Juliana Ferreira', email: 'juliana.ferreira@example.com', password: 'password123', cpf: '00011122210', departamento: 'Design Gráfico', idInstituicaoEnsino: 4 },
    { name: 'Marcos Andrade', email: 'marcos.andrade@example.com', password: 'password123', cpf: '11122233311', departamento: 'Engenharia Civil', idInstituicaoEnsino: 4 },
    { name: 'Camila Rocha', email: 'camila.rocha@example.com', password: 'password123', cpf: '22233344412', departamento: 'Direito', idInstituicaoEnsino: 5 },
    { name: 'Gustavo Pereira', email: 'gustavo.pereira@example.com', password: 'password123', cpf: '33344455513', departamento: 'Psicologia', idInstituicaoEnsino: 5 },
    { name: 'Larissa Barbosa', email: 'larissa.barbosa@example.com', password: 'password123', cpf: '44455566614', departamento: 'Engenharia Elétrica', idInstituicaoEnsino: 6 },
    { name: 'Bruno Gomes', email: 'bruno.gomes@example.com', password: 'password123', cpf: '55566677715', departamento: 'Gestão Ambiental', idInstituicaoEnsino: 7 },
    { name: 'Patrícia Azevedo', email: 'patricia.azevedo@example.com', password: 'password123', cpf: '66677788816', departamento: 'Arquitetura e Urbanismo', idInstituicaoEnsino: 8 },
    { name: 'Rodrigo Santos', email: 'rodrigo.santos@example.com', password: 'password123', cpf: '77788899917', departamento: 'Engenharia Mecânica', idInstituicaoEnsino: 9 },
    { name: 'Vanessa Dias', email: 'vanessa.dias@example.com', password: 'password123', cpf: '88899900018', departamento: 'Enfermagem', idInstituicaoEnsino: 10 },
    { name: 'Tiago Almeida', email: 'tiago.almeida@example.com', password: 'password123', cpf: '99900011119', departamento: 'Educação Física', idInstituicaoEnsino: 10 },
    { name: 'Sandra Nunes', email: 'sandra.nunes@example.com', password: 'password123', cpf: '00011122220', departamento: 'Pedagogia', idInstituicaoEnsino: 1 }
];

const createDefaultProfessors = async (): Promise<void> => {
    try {
        let countCreated = 0;
        for (const profData of professoresData) {
            const [professor, created] = await Professor.findOrCreate({
                where: { email: profData.email },
                defaults: {
                    name: profData.name,
                    email: profData.email,
                    password: profData.password,
                    cpf: profData.cpf,
                    departamento: profData.departamento,
                    idInstituicaoEnsino: profData.idInstituicaoEnsino,
                    saldoMoedas: 1000,
                }
            });

            if (created) {
                console.log(`Professor "${professor.name}" (ID: ${professor.id}) criado com o email ${professor.email} para Instituição ID ${profData.idInstituicaoEnsino}.`);
                countCreated++;
            } else {
                console.log(`Professor com email "${professor.email}" (ID: ${professor.id}) já existe.`);
            }
        }
        console.log(`${countCreated} novos professores padrão criados. Verificação de professores padrão concluída.`);
    } catch (error) {
        console.error('Erro ao criar professores padrão:', error);
    }
};

export default createDefaultProfessors;
