package br.com.condominio.condominio.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import br.com.condominio.condominio.domain.Bloco;

@Transactional
public interface BlocoRepository extends CrudRepository<Bloco, Long>{

}
