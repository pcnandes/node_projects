package br.com.condominio.condominio.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import br.com.condominio.condominio.domain.Unidade;

@Transactional
public interface UnidadeRepository extends CrudRepository<Unidade, Long> {

}
