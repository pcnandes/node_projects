package br.com.condominio.condominio.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import br.com.condominio.condominio.domain.Morador;

@Transactional
public interface MoradorRepository extends CrudRepository<Morador, Long> {

}
