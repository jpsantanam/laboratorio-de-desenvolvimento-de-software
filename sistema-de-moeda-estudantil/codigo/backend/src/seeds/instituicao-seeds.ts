import InstituicaoEnsino from '../models/instituicaoEnsino';

const instituicoesData = [
    { nome: 'PUC Minas' },
    { nome: 'UFMG - Universidade Federal de Minas Gerais' },
    { nome: 'UNA' },
    { nome: 'Newton Paiva' },
    { nome: 'UniBH' },
    { nome: 'CEFET-MG - Centro Federal de Educação Tecnológica de Minas Gerais' },
    { nome: 'IFMG - Instituto Federal de Minas Gerais' },
    { nome: 'FUMEC' },
    { nome: 'Escola de Engenharia Kennedy' },
    { nome: 'Faculdade Pitágoras' }
];

const createDefaultInstituicoes = async (): Promise<void> => {
    try {
        for (const instData of instituicoesData) {
            const [instituicao, created] = await InstituicaoEnsino.findOrCreate({
                where: { nome: instData.nome },
                defaults: instData
            });

            if (created) {
                console.log(`Instituição "${instituicao.nome}" criada.`);
            } else {
                console.log(`Instituição "${instituicao.nome}" já existe.`);
            }
        }
        console.log('Verificação de instituições padrão concluída.');
    } catch (error) {
        console.error('Erro ao criar instituições padrão:', error);
    }
};

export default createDefaultInstituicoes;